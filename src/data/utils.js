import { config } from "@utils"
import { Disk } from "./disk"
 const request = (url) =>
  fetch(url)
    .then(response => response.json())

const serialize = (obj) =>
  Object.keys(obj)
    .map(i => i + "=" + encodeURIComponent(obj[i].toString())).join("&")

export const weatherStackRequest = window.wr = (url, parameters = {}) =>
  request(
    config.weatherstack.baseUrl + url +
    "?" + serialize({ access_key: localStorage.getItem("apiKey") || config.weatherstack.apiKey, ...parameters })
  )
    .then((response) => {
      if (response.error) {
        Disk.error = {
          code: response.error.code,
          key: localStorage.getItem("apiKey") || config.weatherstack.apiKey
        }
      } else {
        delete Disk.error
      }
      return response
    })