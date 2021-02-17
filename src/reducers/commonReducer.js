import {CHECK_INTERNET} from '../actions/commonActions';

const commonReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_INTERNET:
      return checkInternetData({...state}, action.status);
    default:
      return state;
  }
};

const checkInternetData = (state, data) => {
  state = {
    ...state,
    internet: data,
  };
  return state;
};

export default commonReducer;
