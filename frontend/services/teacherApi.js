import axios from "axios";


const API = axios.create({
  baseURL: "https://devkingsbackend-production-3753.up.railway.app/api/teacher",
  withCredentials: true, // 👈 this enables sending cookies
});

// Generic GET function
export const get = async (url, params = {}) => {
  const res = await API.get(url, { params });
  return res.data;
};

export const post = async (url, params = {}, body = {}, isFormData = false) => {
  const headers = isFormData
    ? { 'Content-Type': 'multipart/form-data' }
    : { 'Content-Type': 'application/json' };

  const res = await API.post(url, body, {
    params,
    headers,
  });

  return res.data;
};