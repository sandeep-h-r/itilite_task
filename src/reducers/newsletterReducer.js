import {
  GET_NEWSLETTER_DATA,
  NEWSLETTER_LOADING,
} from '../actions/newsletterAction';

const initialState = {
  newsletterData: [],
  fetchingData: false,
};

const newsletterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NEWSLETTER_DATA: {
      return {
        ...state,
        newsletterData: action.payload,
        fetchingData: false,
      };
    }
    case NEWSLETTER_LOADING: {
      return {
        ...state,
        fetchingData: true,
      };
    }
    default:
      return state;
  }
};

export default newsletterReducer;
