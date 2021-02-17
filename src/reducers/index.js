import {combineReducers} from 'redux';
import commonReducer from './commonReducer';
import homeReducer from './homeReducer';
import newsletterReducer from './newsletterReducer';

const rootReducer = combineReducers({
  common: commonReducer,
  home: homeReducer,
  newsletter: newsletterReducer,
});

export default rootReducer;
