import React, { useState, useEffect } from "react"
import { useWeather } from "@data"
import { navigateTo } from "@utils"
import "./City.sass"

export const City = ({ name, icon }) => {
  let [weather] = useWeather(name)
  if (weather && weather.error) {
    weather = null
  }
  const iconStyle = weather && { backgroundImage: "url(" + weather.weather_icons[0] + ")" }
  return <div className="City" city={name} onClick={navigateTo(name)}>
    <h3>
      <a> {name} </a>
      {icon}
    </h3>
    {
      <div className="CityWeather">
        <div className="icon" style={iconStyle} />
        {weather && <div className="temperature"> {weather.temperature}<a>°C</a> </div>}
      </div>
    }
  </div>
}