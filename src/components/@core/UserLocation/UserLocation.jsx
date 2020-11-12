import classNames from "classnames"
import { toast as notify } from 'react-toastify'
import { Icon } from "@components"
import { navigateTo, useLoadingState } from "@utils"
import { GeoLocation } from "./GeoLocation"
import "./UserLocation.sass"
export const UserLocation = ({ onLocation, current }) => {
  const [{ loading, error }, load] = useLoadingState(5000)
  const requestLocation = (e) => {
    e.stopPropagation()
    e.preventDefault()

    load(GeoLocation.request())
      .then((location) =>
        onLocation(location))
      .catch(error =>
        notify(error, { type: "error", position: "top-center" }))
  }
  return <div className={classNames("UserLocation", { loading, error })}>
    {
      current
        ? <a className="userCity" tabIndex={1} onClick={navigateTo(current)}> {current}</a>
        : <a className="useLocation" onClick={requestLocation} disabled={!GeoLocation.isAvailable}> Use Your Location</a>
    }
    <Icon
      icon="compass" onClick={requestLocation}
      disabled={!GeoLocation.isAvailable}
    />
  </div>
}