import config from '../../shared/config.js';
import {typeFromFilename} from '../../shared/FileTypes.js';
import fs from 'fs';

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

const getPathFromFileId = (fileId) => {
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

const getFileName = (fileId, version) => {
  return getPathFromFileId(fileId) + fileId + 'contents' + version + '.json';
}

const getVersionFileName = (fileId) => {
  return getPathFromFileId(fileId) + fileId + ".json";
}

const getLatestVersion = (fileId) => {
  let versionFileName = getVersionFileName(fileId);

  if(fileExists(versionFileName)){
    try{
      let versionFile = fs.readFileSync(versionFileName);
      let versionFileContents = JSON.parse(versionFile);
      return versionFileContents.version;
    } catch (e){
      console.log(e);
      throw new Error("Error while reading versioning info for file " + versionFileName);
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
    throw new Error("No version of " + versionFileName + " exists");
  }

  let fileName = getFileName(fileId, version);
  return fs.readFileSync(fileName);
}

export const saveFile = (file, type, fileId) => {   
  if(!fileId){
    fileId = getNextId(type);  
  }
  let version = getLatestVersion(fileId) + 1;

  let fileName = getFileName(fileId, version);    ;
  fs.writeFileSync(fileName, JSON.stringify(file, null, '  '));

  let versionFilename = getVersionFileName(fileId);
  fs.writeFileSync(versionFilename, JSON.stringify({version: version}));

  return {fileSaved: true, fileId: fileId, version: version};
}

export const saveFAT = fat => {
  fs.writeFileSync(config.persistence.filesystemPaths.fat, JSON.stringify(fat, null, '  '));
}

export const loadFAT = fat => {
  let fatFileName = config.persistence.filesystemPaths.fat; 
  if(fileExists(fatFileName)){
    return JSON.parse(fs.readFileSync(fatFileName));
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
        folders: {}
      }
    },
    trash: {},
    nextFolderId: 0
  } 
}
