export default ws => store => next => action => {
  //console.log('in middleware', action);
  if(action.target !== 'GUI'){
    ws.send(JSON.stringify(action));
  }
  return next(action);
}