import {
  GET_WEATHER_DATA,
  SAVE_PROFILEPIC_DATA,
  HOME_LOADING,
} from '../actions/homeAction';

const initialState = {
  weatherData: {},
  saveProfilePic: '',
  fetchingData: false,
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WEATHER_DATA: {
      return {
        ...state,
        weatherData: action.payload,
        fetchingData: false,
      };
    }
    case SAVE_PROFILEPIC_DATA: {
      return {
        ...state,
        saveProfilePic: action.payload,
      };
    }
    case HOME_LOADING: {
      return {
        ...state,
        fetchingData: true,
      };
    }
    default:
      return state;
  }
};

export default homeReducer;
