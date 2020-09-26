import axios from "axios";
import { baseURL } from "../config";

const instance = axios.create({
  baseURL,
  timeout: 6000,
  withCredentials: true,
  headers: {
    Accept: "application/json",

    "Access-Control-Allow-Credentials": "true",
  },
});

// .interceptors.request.use(
//   config => {
//     const token = sessionStorage.getItem('ks_token')
//     if (token) {
//       config.headers['Authorizaton'] = `Bearer ${token}`
//     }
//     return config
//   },
//   error => {
//     Promise.reject(error)
//   }
// )

export default instance;
