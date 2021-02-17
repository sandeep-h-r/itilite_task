import {
  get,
  post,
  put,
  plainDelete,
  postFormData,
  imageUpload,
} from './coreApiServices';

export const axiosGet = (api, headers, params) => {
  return get(api, headers, params);
};

export const axiosGetWithToken = async (api, params, token) => {
  let headers = {
    Authorization: `${token}`,
  };

  let result = await get(api, params, headers);
  return result;
};

export const axiosPost = (api, body) => {
  return post(api, body);
};

export const axiosPostWithHeader = (api, body, token) => {
  let headers = {
    Authorization: `${token}`,
  };
  return post(api, body, headers);
};

export const axiosPostWithToken = (api, body, token) => {
  let headers = {
    Authorization: `${token}`,
  };
  return post(api, body, headers);
};

export const axiosPostFormData = async (api, body) => {
  return postFormData(api, body);
};

export const axiosImageUpload = async (media_type, media, token) => {
  return imageUpload(media_type, media, token);
};

export const axiosPut = (api, body, token = null) => {
  let headers = token === null ? {} : {Authorization: `${token}`};
  return put(api, body, headers);
};

export const axiosDelete = (api, token = null) => {
  let headers = token === null ? {} : {Authorization: `${token}`};
  return plainDelete(api, headers);
};
