import axios from "axios";
import { ADMIN_AUTH_LOCAL_STORAGE } from "../Utils/Contaants";
const BASE_PATH = "http://192.168.1.4:5000";
export const get = url => {
  const headers = {
    "Content-Type": "application/json",
    token: localStorage.getItem(ADMIN_AUTH_LOCAL_STORAGE)

    // 'Content-Type': 'application/x-www-form-urlencoded',
  };
  return fetch(`${BASE_PATH}/${url}`, { method: "get", headers });
};
export const post = (url, data = {}) => {
  const headers = {
    "Content-Type": "application/json",
    token: localStorage.getItem(ADMIN_AUTH_LOCAL_STORAGE)
    // 'Content-Type': 'application/x-www-form-urlencoded',
  };
  return fetch(`${BASE_PATH}/${url}`, {
    method: "post",
    body: JSON.stringify(data),
    headers
  });
};
export const put = (url, data = {}) => {
  const headers = {
    "Content-Type": "application/json",
    token: localStorage.getItem(ADMIN_AUTH_LOCAL_STORAGE)
    // 'Content-Type': 'application/x-www-form-urlencoded',
  };
  return fetch(`${BASE_PATH}/${url}`, {
    method: "put",
    body: JSON.stringify(data),
    headers
  });
};
