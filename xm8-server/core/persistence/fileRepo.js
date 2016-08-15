import _ from 'lodash';
import fs from 'fs';

import config from '../../shared/config.js';
import {typeFromFilename} from '../../shared/FileTypes.js';
import {findPath} from '../../shared/filesystem/fileTools';
import {newFile, updateFile} from '../../shared/state/actions/filesystem';

import store from '../state/store.js';

export const getNextInputId = () => {
  let id;
  try{
    id = JSON.parse(fs.readFileSync(config.persistence.filesystemPaths.nextInputId));
  } catch (e){
    id = 0;
  }  
  fs.writeFileSync(config.persistence.filesystemPaths.nextInputId, JSON.stringify(id + 1));  
  return '' + id;
}

export const getNextInputGroupId = () => {
  let id;
  try{
    id = JSON.parse(fs.readFileSync(config.persistence.filesystemPaths.nextInputGroupId));
  } catch (e){
    id = 0;
  }  
  fs.writeFileSync(config.persistence.filesystemPaths.nextInputGroupId, JSON.stringify(id + 1));  
  return '' + id;  
}

const readNextIdFromFile = () => {
  try{
    let id = JSON.parse(fs.readFileSync(config.persistence.filesystemPaths.nextFileId));
    console.log("Starting file id sequence from " + id);
    return id;
  } catch (e){
    console.log("File id sequence reading failed, starting from 0");
    return 0;
  }
}

let nextId = readNextIdFromFile();

const getNextId = (fileType) => {
  let id = nextId++;

  // persist next file id to disk to reread when restarting.
  fs.writeFileSync(config.persistence.filesystemPaths.nextFileId, JSON.stringify(nextId));  
  return fileType.filename + id;
}

const fileExists = (filepath) => {
  try{
    return fs.statSync(filepath).isFile();
  } catch (err){
    if(err.code == 'ENOENT'){
      return false;
    } else {
      throw err;
    }
  }
}

const getFileIdByFilename = (filename, folderId) => {
  let fileId;
  let filesystem = store.getState().filesystem;
  let folder = filesystem.getIn(findPath(folderId, filesystem));
  let filesInFolder = folder.get('files');

  _.forEach(filesInFolder.toJS(), file => {
    if(file.name === filename){
      fileId = file.id;
      return false;
    }
  });
  return fileId;
}

const getHarddrivePathFromFileId = (fileId) => {
  let fileTypeKey = fileId.match(/^[a-z]+/g)[0];
  let fileType = typeFromFilename[fileTypeKey];
  if(!fileType){
    throw new Error("Filetype not found for " + fileTypeKey);
  }
  
  let path = config.persistence.filesystemPaths[fileType.id];  
  if(!path){
    throw new Error("No path found for filetype " + fileTypeKey);
  }

  return path;
}

const getFilename = (fileId, version) => {
  return getHarddrivePathFromFileId(fileId) + fileId + 'contents' + version + '.json';
}

const getVersionFilename = (fileId) => {
  return getHarddrivePathFromFileId(fileId) + fileId + ".json";
}

const getLatestVersion = (fileId) => {
  let versionFilename = getVersionFilename(fileId);

  if(fileExists(versionFilename)){
    try{
      let versionFile = fs.readFileSync(versionFilename);
      let versionFileContents = JSON.parse(versionFile);
      return versionFileContents.version;
    } catch (e){
      console.log(e);
      throw new Error("Error while reading versioning info for file " + versionFilename);
    }
  } else {
    return -1; // no version of the file exists.
  }
}

export const loadFile = (fileId, version) => {
  if(!version){
    version = getLatestVersion(fileId);
  } 
  if(version === -1) {
    throw new Error("No version of " + versionFilename + " exists");
  }

  let filename = getFilename(fileId, version);

  return JSON.parse(fs.readFileSync(filename, 'utf8'));
}

export const saveFile = (file, type, filename, folderId) => {

  // search for existing file by name, reuse id if name is found
  let fileId = getFileIdByFilename(filename, folderId);

  if(!fileId){
    fileId = getNextId(type);  
  }
  let version = getLatestVersion(fileId) + 1;

  let harddriveFilename = getFilename(fileId, version);
  fs.writeFileSync(harddriveFilename, JSON.stringify(file, null, '  '), 'utf8');

  let versionFilename = getVersionFilename(fileId);
  fs.writeFileSync(versionFilename, JSON.stringify({version: version}));

  if(version === 0){
    store.dispatch(newFile(fileId, version, filename, folderId));
  } else {
    store.dispatch(updateFile(fileId, version, folderId));
  }

  return {fileSaved: true, fileId: fileId, version: version};
}

export const saveFAT = fat => {
  fs.writeFileSync(config.persistence.filesystemPaths.fat, JSON.stringify(fat, null, '  '));
}

export const loadFAT = fat => {
  let fatFilename = config.persistence.filesystemPaths.fat; 
  if(fileExists(fatFilename)){
    return JSON.parse(fs.readFileSync(fatFilename));
  } else {
    return getInitialFat();
  }
}

const getInitialFat = () => {
  return {   
    files: {},
    folders: {
      patches: {
        name: 'patches',
        id: 'patches',
        files: {},
        folders: {},
        undeletable: true
      },
      inputgroups: {
        name: 'inputgroups',
        id: 'inputgroups',
        files: {},
        folders: {},
        undeletable: true
      },
      inputs: {
        name: 'inputs',
        id: 'inputs',
        files: {},
        folders: {},
        undeletable: true
      }            
    },
    trash: {},
    nextFolderId: 0
  } 
}
