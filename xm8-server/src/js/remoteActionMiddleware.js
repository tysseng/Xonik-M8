export default ws => store => next => action => {
  console.log('in middleware', action);
  ws.send(JSON.stringify(action));
  return next(action);
}