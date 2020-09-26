import axios from "axios";
import { baseURL } from "../config";

const instance = axios.create({
  baseURL,
  timeout: 10000,
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
