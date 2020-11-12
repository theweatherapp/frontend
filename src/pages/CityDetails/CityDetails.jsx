import { useEffect, useState } from "react"
import classNames from "classnames"
import { Weather, Notes, Icon, AFavouritesManager, Time } from "@components"
import { Disk, useWeather, cityDisk, weatherDisk } from "@data"
import { WeatherError } from "@views"
import "./CityDetails.sass"

/**
 * @description City Details Page shows name, country, notes and weather forecest of city
 * @param {{city: string}} ICityDetailsProps
 */

export const CityDetails = ({ city }) => {
  const [weather] = useWeather(city)
  const [cityNotFound, setCityNotFound] = useState(false)
  const Favourites = AFavouritesManager("cities")

  useEffect(() => {
    setCityNotFound(false)
    const timeout = setTimeout(() => {
      if (!weatherDisk[city]) {
        setCityNotFound(true)
      }
    }, 1000)
    return () => clearTimeout(timeout)
  }, [city])
  const loading = !weather && !cityNotFound

  const { country, time, region } = cityDisk[city] || {}
  Disk.visibleCities = [city]

  const state = country === "United States of America" ? ", " + region : null
  return <div className={classNames("CityDetails", { loading, error: cityNotFound })}>
    <h1>
      <a>{city}{state}</a>
      {country && <a className="country">({country})</a>}
      {time && <Time value={time} />}
      {(!cityNotFound && !loading) && Favourites.icon[city]}
    </h1>
    {cityNotFound && <WeatherError city={city} />}

    <Weather data={weather} />
    <Notes item={city} />
  </div >
}