import _ from 'lodash';
import fs from 'fs';
import mkdirp from 'mkdirp';

import config from '../../shared/config.js';
import {filetypes, typeFromFilename} from '../../shared/FileTypes.js';
import {findPath} from '../../shared/filesystem/fileTools';
import {newFile, updateFile} from '../../shared/state/actions/filesystem';
import { getFilesystem } from '../state/selectors';


import store from '../state/store.js';

let nextIdPath = config.persistence.filesystemPaths.nextId;

// return the next available unique id that can be used for any object in state
export const getNextUniqueId = () => {
  let id;
  try{
    id = JSON.parse(fs.readFileSync(nextIdPath));
  } catch (e){
    id = 0;
  }  
  fs.writeFileSync(nextIdPath, JSON.stringify(id + 1));  
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
  let filesystem = getFilesystem();
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
  let fileTypeKey = fileId.match(/^[a-zA-Z]+/g)[0];
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

export const saveDirect = (path, contents) => {
  fs.writeFileSync(path, JSON.stringify(contents, null, '  '), 'utf8');
}

export const loadDirect = (path) => {
  if(fileExists(path)) {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
  } else {
    return undefined;
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

// To save file on top of existing file, versioned must be set to false.
// It defaults to true to get a new copy of the file every time, but may
// be overriden, for example for auto-save functionality
//
// NB: folderId is the virtual folder to save the file in, not the physical folder
// on disk. Files on disk are saved in a flat structure but separated into
// physical folders by their filename - file-to-folder mapping is done by first
// looking up the filename-to-filetype mapping in FileTypes, then getting the
// folder for that type from the global config.
export const saveFile = (file, type, filename, folderId, versioned = true) => {

  // search for existing file by name, reuse id if name is found
  let fileId = getFileIdByFilename(filename, folderId);

  if(!fileId){
    fileId = getNextId(type);  
  }

  let version = getLatestVersion(fileId);
  if(versioned){
    version = version + 1;
  }


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

export const createPhysicalFolders = () => {

  // Creating physical folders. NB: These are NOT the same as the root folders in the virtual file system.
  // Instead, they are where files of a particular type are put on disk. See saveFile comment.
  let foldersToCreate = [
    config.persistence.filesystemPaths[filetypes.PATCH.id],
    config.persistence.autosave.rootFolder
  ];

  _.each(foldersToCreate, folder => {
    mkdirp(folder, err => {
      if(err) console.log("Error while creating folder " + folder, err);
      else console.log("Created folder " + folder);
    });
  });
}

export const saveFAT = fat => {
  fs.writeFileSync(config.persistence.filesystemPaths.fat, JSON.stringify(fat, null, '  '));
}

export const loadFAT = () => {
  let fatFilename = config.persistence.filesystemPaths.fat; 
  if(fileExists(fatFilename)){
    return JSON.parse(fs.readFileSync(fatFilename));
  } else {
    // first time, set up physical and virtual filesystem
    createPhysicalFolders();
    let fat = getInitialFat();
    saveFAT(fat);
    return fat;
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
      }
    },
    trash: {},
    nextFolderId: 0
  } 
}
