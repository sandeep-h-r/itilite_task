import {API} from '../config/api';
import {axiosGet} from '../services/apiServices';

export const GET_WEATHER_DATA = 'GET_WEATHER_DATA';
export const SAVE_PROFILEPIC_DATA = 'SAVE_PROFILEPIC_DATA';
export const HOME_LOADING = 'HOME_LOADING';

export const getWeatherData = (params) => {
  const headers = {
    'x-rapidapi-key': 'ae32b1caefmsh76f49e4425ffbb8p15c74fjsn7cd35649b5db',
    'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
  };
  return async (dispatch, getstate) => {
    axiosGet(`${API.GET_WEATHER_DATA}`, headers, params).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: GET_WEATHER_DATA,
          payload: res.data,
        });
      } else {
        console.log(`Error: ${JSON.stringify(res.status)}`);
      }
    });
  };
};

export const saveProfilePic = (picture) => {
  return async (dispatch, getstate) => {
    dispatch({
      type: SAVE_PROFILEPIC_DATA,
      payload: picture,
    });
  };
};

export const isLoading = () => {
  return async (dispatch, getstate) => {
    dispatch({
      type: HOME_LOADING,
    });
  };
};
