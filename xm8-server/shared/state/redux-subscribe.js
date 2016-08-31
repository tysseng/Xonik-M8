
import _ from 'lodash';

/**
 * Action types
 */

const SUBSCRIBE = '@@redux-subscribe/subscribe';
const UNSUBSCRIBE = '@@redux-subscribe/unsubscribe';

function indexOfPath(paths, pathObj){
  return _.findIndex(paths, existingPathObj => {
    return existingPathObj.path === pathObj.path;
  });
}

function hasNotBeenAdded(paths, pathObj){
  return -1 === indexOfPath(paths, pathObj);
}
/**
 * redux-subscribe
 */

function subscribeMiddleware ({dispatch, getState}) {
  const paths = [];
  const subscriptions = {};

  return next => action => {
    switch (action.type) {
      case SUBSCRIBE: {
        const {pathObj, subscriberKey, fn} = action.payload;
        const path = pathObj.path;
        subscriptions[path] = subscriptions[path] || {};
        subscriptions[path][subscriberKey] = fn;

        if (hasNotBeenAdded(paths, pathObj)) {
          paths.push(pathObj)
        }
        break
      }
      case UNSUBSCRIBE: {
        const {pathObj, subscriberKey} = action.payload;
        const path = pathObj.path;
        const subs = subscriptions[path];

        if (subs) {
          delete subs[subscriberKey];
          if (Object.keys(subs).length === 0) {
            delete subscriptions[path];
            paths.splice(indexOfPath(paths, pathObj), 1);
          }
        }

        break
      }
      default: {
        const prevState = getState();
        const result = next(action);
        const nextState = getState();

        _.each(paths, pathObj => {
          let pathElements = pathObj.pathElements;

          let prev = prevState[pathElements[0]];
          let next = nextState[pathElements[0]];


          if(pathElements.length > 1){
            let subPath = pathElements.slice(1);
            if(prev) prev = prev.getIn(subPath);
            if(next) next = next.getIn(subPath);
          }

          if (prev !== next) {
            _.each(subscriptions[pathObj.path], callback  => callback({pathObj, prev, next}));
          }
        });

        return result;
      }
    }
  }
}

/**
 * Action creators
 */

function subscribe (path, subscriberKey, fn) {
  return {
    type: SUBSCRIBE,
    payload: {
      pathObj: {
        pathElements: path.split('/'),
        path
      },
      subscriberKey,
      fn
    }
  }
}

function unsubscribe (path, subscriberKey) {
  return {
    type: UNSUBSCRIBE,
    payload: {
      pathObj: {
        pathElements: path.split('/'),
        path
      },
      subscriberKey
    }
  }
}

/**
 * Exports
 */

export default subscribeMiddleware
export {
  subscribe,
  unsubscribe
}