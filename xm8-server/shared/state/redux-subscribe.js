
import _ from 'lodash';

/**
 * Action types
 */

const SUBSCRIBE = '@@redux-subscribe/subscribe';
const UNSUBSCRIBE = '@@redux-subscribe/unsubscribe';

function indexOfPath(paths, pathObj){
  return _.findIndex(paths, existingPathObj => {
    return existingPathObj.pathKey === pathObj.pathKey;
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
        const {pathObj, key, fn} = action.payload;
        const pathKey = pathObj.pathKey;
        subscriptions[pathKey] = subscriptions[pathKey] || {};
        subscriptions[pathKey][key] = fn;

        if (hasNotBeenAdded(paths, pathObj)) {
          paths.push(pathObj)
        }
        break
      }
      case UNSUBSCRIBE: {
        const {pathObj, key} = action.payload;
        const pathKey = pathObj.pathKey;
        const subs = subscriptions[pathKey];

        if (subs) {
          delete subs[key];
          if (Object.keys(subs).length === 0) {
            delete subscriptions[pathKey];
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
          let path = pathObj.path;

          let subPath;
          if(path.length > 1){
            subPath = path.slice(1);
          }

          let prev = prevState[path[0]];
          let next = nextState[path[0]];

          if(subPath){
            if(prev) prev = prev.getIn(subPath);
            if(next) next = next.getIn(subPath);
          }

          if (prev !== next) {
            _.each(subscriptions[pathObj.pathKey], callback  => callback({pathObj, prev, next}));
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

function subscribe (pathKey, key, fn) {
  return {
    type: SUBSCRIBE,
    payload: {
      pathObj: {
        path: pathKey.split('/'),
        pathKey
      },
      key,
      fn
    }
  }
}

function unsubscribe (pathKey, key) {
  return {
    type: UNSUBSCRIBE,
    payload: {
      pathObj: {
        path: pathKey.split('/'),
        pathKey
      },
      key
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