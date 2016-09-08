
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

  const addSubscription = (pathObj, subscriberKey, fn) => {
    const path = pathObj.path;
    subscriptions[path] = subscriptions[path] || {};
    subscriptions[path][subscriberKey] = fn;

    if (hasNotBeenAdded(paths, pathObj)) {
      paths.push(pathObj)
    }
  }

  const notifySubscribers = (prev, next, subscriptionPath, pathElements) => {
    _.each(subscriptions[subscriptionPath], callback  => callback({pathElements, prev, next}));
  }

  const notifySubscribersIfChanged = (prev, next, subscriptionPath, pathElements) => {
    if (prev !== next) {
      notifySubscribers(prev, next, subscriptionPath, pathElements);
    }
  }

  const replaceWildcardWithKey = (pathElements, key) => {
    const updatedPathElements = pathElements.slice();
    updatedPathElements[1] = key;
    return updatedPathElements;
  }

  const checkAndNotifyWithWildcard = (prev, next, subscriptionPath, pathElements) => {
    // Loop over all subState elements if wildcard is used.
    for (const key of next.keys()) {

      // replace wildcard with real key
      const pathWithoutWildcard = replaceWildcardWithKey(pathElements, key);

      // extract subPath for current wildcard-key
      const subpathWithoutWildcard = pathWithoutWildcard.slice(1);

      let subPrev, subNext;
      if (prev) subPrev = prev.getIn(subpathWithoutWildcard);
      if (next) subNext = next.getIn(subpathWithoutWildcard);

      notifySubscribersIfChanged(subPrev, subNext, subscriptionPath, pathWithoutWildcard);
    }
  }

  return next => action => {
    switch (action.type) {
      case SUBSCRIBE: {
        const {pathObj, subscriberKey, fn} = action.payload;
        addSubscription(pathObj, subscriberKey, fn);
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
          let subscriptionPath = pathObj.path;

          let prev = prevState[pathElements[0]];
          let next = nextState[pathElements[0]];

          if(prev !== next) {
            if (pathElements.length > 1) {

              let subPath = pathElements.slice(1);
              if (subPath[0] === '*') {
                checkAndNotifyWithWildcard(prev, next, subscriptionPath, pathElements)
              } else {
                if (prev) prev = prev.getIn(subPath);
                if (next) next = next.getIn(subPath);
                notifySubscribersIfChanged(prev, next, subscriptionPath, pathElements);
              }
            } else {
              notifySubscribers(prev, next, subscriptionPath, pathElements);
            }
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