//change when deploy
const baseUrl = "http://localhost:3001/api/";

export const fetchAbsolute = ({ url, ...otherParams }) =>
  fetch(baseUrl + url, ...otherParams);
