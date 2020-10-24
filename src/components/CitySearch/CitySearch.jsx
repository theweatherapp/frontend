import React, { useState, useRef, Fragment } from "react"
import classNames from "classnames"
import useOnline from "@rooks/use-online"
import { UserLocation, AFavouritesManager, Search } from "@components"
import { Service, useUserDisk } from "@data"
import { navigate } from "@utils"
import "./CitySearch.sass"
/** 
 * @description 
 *   CitySearch Component allows user to search and select cities to look up for weather details. 
 *   It encapsulates Search component
 * @requirement 4
 */

export const CitySearch = () => {
  const isOnline = useOnline()
  const Favourites = AFavouritesManager("cities")
  const [userCity, setUserCity] = useUserDisk("city")
  const searchRef = useRef()
  const onLocation = ({ lat, lng }) =>
    Service.searchCity(lat + "," + lng)
      .then((results) => {
        setUserCity(results[0])
        searchRef.current && searchRef.current.clear()
        results.length && navigate(results[0])
      })
  const navigateToUserCity = () => {
    searchRef.current && searchRef.current.clear()
    navigate(userCity)
  }
  const focus = () => setFocused(true)
  const focusOut = () => setFocused(false)
  const renderer = ((city) =>
    <Fragment>
      {Favourites.icon[city]}
      {city}
    </Fragment>
  )
  const search = (query) => Service.searchCity(query).then((results) => results.sort())
  return <Search
    ref={searchRef}
    renderer={renderer}
    placeholder={isOnline ? "Search cities..." : "No internet connection. Go online to search cities..."}
    search={search}
    onSelect={navigate}
    disabled={!isOnline}
  >
    {userCity && <a className="userCity" tabIndex={1} onClick={navigateToUserCity}> {userCity}</a>}
    {isOnline && <UserLocation onLocation={onLocation} />}
  </Search>
}
