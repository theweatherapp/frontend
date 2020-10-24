import { useEffect } from "react"
import { weatherDisk, Disk, useWeatherDisk } from "./disk"
import { Service } from "./Service"
import { config } from "@utils"

export const updateWeatherInfo = (city) =>
  Service.weatherInfo(city)
    .then((data) => weatherDisk[city] = data)

export const useWeather = (city) => {
  const [data, setData] = useWeatherDisk(city)

  const update = () =>
    Service.weatherInfo(city)
      .then(setData)


  useEffect(() => {
    if (!weatherDisk[city]) { update() }
  }, [city])

  return [data, update]
}

export const useWeatherUpdater = () =>
  useEffect(() => {
    const updateInterval = setInterval(() =>
      Disk.visibleCities.forEach((city) =>
        navigator.onLine && updateWeatherInfo(city))
      , (config.updateWeatherIntervalSecs || 60) * 1000)

    return () => {
      clearInterval(updateInterval)
    }
  }, [])