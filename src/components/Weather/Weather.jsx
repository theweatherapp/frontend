import  { useState, useEffect } from "react"
import classnames from "classnames"
import GaugeChart from "react-gauge-chart"
import { Icon } from "@components"
import "./Weather.sass"

export const Weather = ({ data }) => {
  const {
    wind_speed,
    temperature,
    precip,
    humidity,
    wind_degree,
    pressure,
    visibility,
    uv_index,
    weather_descriptions,
    weather_icons
  } = data || {}

  const icon = weather_icons ? weather_icons[0] : null
  const description = weather_descriptions ? weather_descriptions[0] : null

  return <div className="Weather">
    <h2> Current Weather </h2>
    <div className="description"> <img src={icon} alt={description} /> <a>{description}</a></div>
    <div className="Cards">
      <div className="temp Card">
        <h3><Icon icon="thermometer-three-quarters" /> Temperature </h3>
        <div className="value"> <b>{Math.round(temperature || 0)}</b>°C </div>
      </div>
      <div className="wind Card">
        <h3><Icon icon="wind" /><div className="arrow" style={{ transform: "rotate(" + (wind_speed && wind_degree || 0) + "deg)" }} /> Wind </h3>
        <div className="value"><b>{wind_speed || 0}</b> m/s</div>
      </div>
      <div className="humidity Card">
        <h3><Icon icon="tint" /> Humidity</h3>
        <div className="value"> <b>%{humidity || 0}</b></div>
      </div>
      <div className="pressure Card">
        <h3><Icon icon="tachometer-alt" /> Pressure </h3>
        <div className="value"> <b>{pressure || 0}</b> hPa </div>
      </div>
      <div className="visibility Card">
        <h3><Icon icon="eye" /> Visibility </h3>
        <div className="value"> <b>%{visibility || 0}</b> </div>
      </div>
      <div className="precip Card">
        <h3><Icon icon="umbrella" /> Precipitation </h3>
        <div className="value"> <b>%{precip || 0}</b> </div>
      </div>
      <div className="uv_index Card">
        <h3><Icon icon="umbrella" /> UV Index </h3>
        <div className="value"> <GaugeChart id="uv_gauge"
          nrOfLevels={10}
          animate={false}
          percent={(uv_index - .5) / 10}
        /> <b>{uv_index || 0}</b> </div>
      </div>
    </div>
  </div>
}