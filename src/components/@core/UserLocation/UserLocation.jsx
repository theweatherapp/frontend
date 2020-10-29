import React, { useState } from "react"
import { GeoLocation } from "./GeoLocation"
import classNames from "classnames"
import { Icon } from "@components"
import "./UserLocation.sass"
export const UserLocation = ({ onLocation }) => {
  const [{ loading, error }, setLoading] = useState({ loading: false, error: false })

  const requestLocation = () => {
    setLoading({ loading: true, error: false })
    GeoLocation.request()
      .then((location) => {
        onLocation(location)
        setLoading({ loading: false, error: false })
      })
      .catch(e => setLoading({ loading: false, error: true }))
  }
  return <Icon
    icon="compass"
    className={classNames("UserLocation", { loading, error })}
    onClick={requestLocation}
    disabled={!GeoLocation.isAvailable}
  />
}