import { combineReducers } from 'redux';
import jobs from './jobs';
import errors from './errors';

export default combineReducers({
  // Will take in an object (whose values are reducers) that has all the reduces I create ex: auth reducer
  jobs,
  errors,
});

// Flow of redux:
// To add new recources and fuctionality, you can just simply create a new reducer and a new actions file and then create the components
