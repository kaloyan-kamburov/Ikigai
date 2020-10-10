import axios from "axios";
import { baseURL } from "../config";

const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

const instance = axios.create({
  baseURL,
  timeout: 6000,
  withCredentials: true,
  // headers: {
  //   Accept: "application/json",
  //   "Access-Control-Allow-Credentials": "true",

  // },
});

instance.interceptors.request.use((config) => {
  config.headers["X-CSRFToken"] = getCookie("csrftoken");
  return config;
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
