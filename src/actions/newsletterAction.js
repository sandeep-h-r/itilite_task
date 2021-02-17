import {API} from '../config/api';
import {axiosGet} from '../services/apiServices';

export const GET_NEWSLETTER_DATA = 'GET_NEWSLETTER_DATA';
export const NEWSLETTER_LOADING = 'NEWSLETTER_LOADING';

export const getNewsLetterData = (params) => {
  const headers = {};
  return async (dispatch, getstate) => {
    axiosGet(`${API.GET_NEWSLETTER_DATA}`, headers, params).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: GET_NEWSLETTER_DATA,
          payload: res.data.articles,
        });
      } else {
        console.log(`Error: ${JSON.stringify(res.status)}`);
      }
    });
  };
};

export const isLoading = () => {
  return async (dispatch, getstate) => {
    dispatch({
      type: NEWSLETTER_LOADING,
    });
  };
};
