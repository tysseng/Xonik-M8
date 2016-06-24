
import _ from 'lodash';

/**
 * Action types
 */

const SUBSCRIBE = '@@redux-subscribe/subscribe'
const UNSUBSCRIBE = '@@redux-subscribe/unsubscribe'

/**
 * redux-subscribe
 */

function subscribeMiddleware ({dispatch, getState}) {
  const paths = []
  const subscriptions = {}

  return next => action => {
    switch (action.type) {
      case SUBSCRIBE: {
        const {path, key, fn} = action.payload
        subscriptions[path] = subscriptions[path] || {}
        subscriptions[path][key] = fn
        if (paths.indexOf(path) === -1) {
          paths.push(path)
        }
        break
      }
      case UNSUBSCRIBE: {
        const {path, key} = action.payload
        const subs = subscriptions[path]

        if (subs) {
          delete subs[key]
          if (Object.keys(subs).length === 0) {
            delete subscriptions[path]
            paths.splice(paths.indexOf(path), 1)
          }
        }

        break
      }
      default: {
        const prevState = getState();
        const result = next(action);
        const nextState = getState();

        _.each(paths, path => {
          const prev = prevState[path];
          const next = nextState[path];

          if (prev !== next) {
            _.each(subscriptions[path], fn => dispatch(fn({path, prev, next})));
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

function subscribe (path, key, fn) {
  return {
    type: SUBSCRIBE,
    payload: {path, key, fn}
  }
}

function unsubscribe (path, key) {
  return {
    type: UNSUBSCRIBE,
    payload: {path, key}
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