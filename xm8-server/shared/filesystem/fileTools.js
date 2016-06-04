import _ from 'lodash';

// may be slow, does a depth first search for folder
export const findFolderIdForFileId = (fileId, version, root) => {
  let foundFolderId = null;
  let folders = root.get('folders');

  let file = root.getIn(['files', fileId]);

  if(file){
    foundFolderId = root.get('id');
  } else {
    _.forEach(root.get('folders').toArray(), subFolder => {    
      let folderId = findFolderIdForFileId(fileId, version, subFolder);
      if(folderId){
        foundFolderId = folderId;
        return false;
      } 
    });
  }

  return foundFolderId;
}

// may be slow, does a depth first search for folder
export const findPath = (id, folder) => {
  let foundSubPath = null;
  let folders = folder.get('folders');

  _.forEach(folders.toArray(), subFolder => {    

    if(subFolder.get('id') === id){
      foundSubPath = ['folders', id];
      return false;
    } 

    let subPath = findPath(id, subFolder);
    if(subPath){
      foundSubPath = ['folders', subFolder.get('id')].concat(subPath);
      return false; 
    }    
  });
  return foundSubPath;
}

export const getFilesInFolder =(selectedFolderId, root) => {
  if(root.get('id') === selectedFolderId){
    return root.get('files');
  } else {
    let pathToFolder = findPath(selectedFolderId, root);
    return root.getIn(pathToFolder.concat(['files']));
  }
}

const trimSlashes = path => {
  if(path.startsWith('/')){
    path = path.substring(1);
  }
  if(path.endsWith('/')){
    path = path.substring(0, path.length -1);
  }    
  return path; 
}


export const getFolderByPathIds = (root, path) => {

  const getFolder = (root, parts) => {
    if(!root) throw Error("Folder not found");

    if(parts.length === 0){
      return root;
    } 

    let subfolderId = parts.shift();
    return getFolder(root.getIn(['folders', subfolderId]), parts);
  }

  if(!root) throw Error("File tree root not specified");
  if(!path) throw Error("File tree root not specified");

  path = trimSlashes(path);
  if(path === ''){
    return root;
  }
  let parts = path.split('/');

  return getFolder(root, parts);

}

export const getFolderByPathNames = (root, path) => {

  const getFolder = (root, parts) => {
    if(!root) throw Error("Folder not found");
    
    if(parts.length === 0){
      return root;
    } 

    let foundSubFolder;
    let folderName = parts.shift();

    let pathId = _.forEach(root.get('folders').toArray(), folder => {
      if(folder.get('name') === folderName){
        foundSubFolder = folder;
        return false; 
      }
    });

    if(foundSubFolder){
      return getFolder(foundSubFolder, parts);  
    } else {
      throw Error("Folder not found");
    }
  }

  if(!root) throw Error("File tree root not specified");
  if(!path) throw Error("File tree root not specified");

  path = trimSlashes(path);
  if(path === ''){
    return root;
  }
  let parts = path.split('/');

  return getFolder(root, parts);


}