import store from './core/state/store';
import {loadFilesystem} from './shared/state/actions/filesystemActions';

// Kickstart XM8!
// start web server
require('./web/server.js');

// load filesystem into state
store.dispatch(loadFilesystem());

