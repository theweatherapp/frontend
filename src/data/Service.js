import { uniqueKeys, now } from "@utils"
import { weatherStackRequest } from "./utils"
import { cityDisk } from "./disk"

export const Service = {
  /**
   * @param {string} query 
   * @description search cities
   * @return {({id: number, name: string, country: string })[]}
   */
  searchCity: (query) =>
    weatherStackRequest("autocomplete", { query })
      .then(({ results: cities }) =>
        uniqueKeys(cities
          .map(({ name }) => name))),
  /**
  * @param {string[]} cityList
  * @description weather information of city
  * @return {{wind: number, temperature: string, pressure: string, humidty: number }}
  */
  weatherInfo: (city) =>
    weatherStackRequest("current", { query: city })
      .then((response) => {
        if (response.error) {
          return Promise.reject(response)
        }
        const { current: weather, location: { country, region, localtime_epoch } } = response
        cityDisk[city] = {
          region,
          country,
          time: localtime_epoch + (new Date()).getTimezoneOffset() * 60
        }
        weather.acquired = now()
        return weather
      })
}