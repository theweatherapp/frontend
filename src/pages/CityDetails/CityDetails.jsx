import React from "react"
import classNames from "classnames"
import { Weather, Notes, Icon, AFavouritesManager, Time } from "@components"
import { Disk, useWeather, cityDisk } from "@data"
import { WeatherError } from "@views"
import "./CityDetails.sass"

/**
 * @description City Details Page shows name, country, notes and weather forecest of city
 * @param {{city: string}} ICityDetailsProps
 */

export const CityDetails = ({ city }) => {
  const [weather] = useWeather(city)
  const Favourites = AFavouritesManager("cities")

  const loading = !weather
  if (weather && weather.error) {
    return <WeatherError city={city} />
  }
  const { country, time, region } = cityDisk[city] || {}
  Disk.visibleCities = [city]

  const state = country === "United States of America" ? ", " + region : null
  return <div className={classNames("CityDetails", { loading })}>
    <h1>
      <a>{city}{state}</a>
      {country && <a className="country">({country})</a>}
      {time && <Time value={time} />}
      {Favourites.icon[city]}
    </h1>
    <Weather data={weather} />
    <Notes item={city} />
  </div >
}