import axios from 'axios';
import qs from 'qs';
import {API} from '../config/api';

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

const attachDefaultContentType = (header) => {
  if (header['Content-Type'] === null || header['Content-Type'] === undefined) {
    header['Content-Type'] = 'application/json';
  }
  return header;
};

// get method
export const get = async (api, headers = {}, params = {}) => {
  const getheaders = headers ? headers : attachDefaultContentType(headers);
  let response = await axios
    .get(api, {params: params, headers: getheaders})
    .then((res) => ({
      data: res.data,
      status: res.status,
    }))
    .catch((err) => err.response);

  return response;
};

// Post method
export const post = async (api, body, headers = {}) => {
  headers = attachDefaultContentType(headers);
  let response = await axios
    .post(api, body, {
      headers: headers,
    })
    .then((res) => ({data: res.data, status: res.status}))
    .catch((err) => err.response);
  return response;
};

// Put method
export const put = async (api, body, headers = {}) => {
  headers = attachDefaultContentType(headers);
  let args = [api, body];

  if (headers) {
    args = [
      api,
      body,
      {
        headers: headers,
      },
    ];
  }
  let response = await axios
    .put(...args)
    .then((res) => ({data: res.data, status: res.status}))
    .catch((err) => err.response);
  return response;
};

// delete
export const plainDelete = async (api, headers) => {
  headers = attachDefaultContentType(headers);
  let args = [api];
  if (headers) {
    args = [
      api,
      {
        headers: headers,
      },
    ];
  }
  let response = await axios
    .delete(...args)
    .then((res) => ({data: res.data, status: res.status}))
    .catch((err) => err.response);
  return response;
};

// post form data
export const postFormData = async (api, body) => {
  let result = await axios.post(api, qs.stringify(body), config);
  let response = {
    status: result.status,
    data: result.data,
  };
  return response;
};

export const imageUpload = async (media_type, media, token) => {
  let headers = {
    Authorization: token,
    accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  };

  let formData = new FormData();

  formData.append('media_type', media_type);
  formData.append('media', {
    uri: media.path || media.uri,
    type: media.mime || 'image/jpg',
    name: media.path || media.uri || 'file_anoynmus',
  });

  let result = await axios.post(API.UPLOAD_FILES, formData, {headers});
  return {
    status: result.status_code,
    data: result.data,
  };
};
