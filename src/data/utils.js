import { config } from "@utils"
const request = (url) =>
  fetch(url)
    .then(response => response.json())

const serialize = (obj) =>
  Object.keys(obj)
    .map(i => i + "=" + encodeURIComponent(obj[i].toString())).join("&")

export const weatherStackRequest = (url, parameters = {}) =>
  request(
    config.weatherstack.baseUrl + url +
    "?" + serialize({ access_key: config.weatherstack.apiKey, ...parameters }))