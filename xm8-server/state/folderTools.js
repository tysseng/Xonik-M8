// may be slow. 
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