import { useEffect, useState, createElement } from "react"
import { createBrowserHistory } from "history"

export const config = require("../../config/project.json")

/**
 * @method now
 * @description current timestamp
 * @return {number}
 */
export const now = () => Math.round(Date.now() / 1000)

/**
 * @typedef {(...args?: any[]) => void} Func
 * 
 * @method debounce
 * @description debounces function with given time
 * @param {Func}  func
 * @param {number} wait
 * @return {Func}
 */
export function debounce(func, wait) {
  var timeout;
  return function (...args) {
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout((args) => func.apply(context, args), wait, args)
  }
}


/**
 * @method uniqueKeys
 * @description removes repeated keys in array
 * @param {T[]} array
 * @return {T[]} 
 */
export const uniqueKeys = (array) => Array.from(new Set(array))


/**
 * @method timeString
 * @description converts date to time string
 * @param {Date} date
 * @return {string}
 */
export const timeString = (date) =>
  [date.getDate(), date.getMonth() + 1]
    .map(i => (i + "").padStart(2, 0)).join(".") + "."
  + date.getFullYear()
  + " " + [date.getHours(), date.getMinutes()]
    .map(i => (i + "").padStart(2, 0)).join(":")


/** 
 * @method useRedirect
 * @description calls callback if location matches pattern
 * @param {RegExp} pattern
 * @param {(...args: string[]) => void} callback
 * @return {void}
 */
export const useRedirect = (pattern, callback) => {
  useEffect(() => {
    const matches = window.location.href.match(pattern)
    matches && callback(...matches.slice(1))
  }, [])
}

export const history = createBrowserHistory()

export const navigateTo = (city = "") => () => {
  history.push("/" + city)
}
export const navigate = (city = "") => {
  history.push("/" + city)
}
export const withParamsDecorator = (Component) =>
  ({ match: { params } }) =>
    createElement(Component, params)

export const useLoadingState = (resetErrorState) => {
  const [{ loading, error }, setLoading] = useState({ loading: false, error: false })
  const resetState = () => setLoading({ loading: false, error: false })
  const load = (promise) => {
    setLoading({ loading: true, error: false })
    return promise.then((forwardResult) => {
      resetState()
      return forwardResult
    }).catch((forwardError) => {
      setLoading({ loading: false, error: true })
      return Promise.reject(forwardError)
    })
  }

  if (resetErrorState) {
    useEffect(() => {
      let removeErrorState
      if (error) {
        removeErrorState = setTimeout(() => {
          error && resetState()
        }, resetErrorState || 5000)
      }
      return () => clearTimeout(removeErrorState)
    }, [error])
  }
  return [{ loading, error }, load, resetState]
}