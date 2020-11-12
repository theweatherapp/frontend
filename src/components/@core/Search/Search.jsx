import { useState, useEffect, Fragment, forwardRef } from "react"
import classNames from "classnames"
import { Icon, UserLocation } from "@components"
import { debounce, useLoadingState } from "@utils"
import "./Search.sass"

/**
 * @description
 *   Search Component provides interface to search items.
 * 
 * @param {{
 *    renderer: (result: string) => JSX.Element
 *    onSelect: (result: string) => void
 *    search: (query: string) => Promise<string[]>
 *    className?: string
 *    disabled?: boolen
 *    placeholder?: boolen
 *    children?: JSX.Element
 * }} ISearchProps
 * 
 */
/* DIRTY Code
  this variable(queryVar) holds last query to ensure processing results of it
  cannot using variable "query" for this because the nature of useState
  change if you find better method
 */
let queryVar
export const Search = forwardRef(({ className, disabled, placeholder, search, renderer, children, onSelect }, ref) => {
  const [results, setResults] = useState([])
  const [query, setQuery] = useState("")
  const [{ error, loading }, startLoading, resetLoading] = useLoadingState()
  const [isFocused, setFocused] = useState(false)
  // debounced API call 
  useEffect(() => {
    if (disabled) {
      clearSearch()
    }
    resetLoading()
  }, [disabled])
  const debouncedSearch = debounce(searchQuery =>
    startLoading(search(searchQuery))
      .then((data) => {
        if ((searchQuery === queryVar) && navigator.onLine) {
          isFocused && setResults(data)
        }
      })
      .catch(() => {
        if ((searchQuery === queryVar) && navigator.onLine) {
          setResults([])
        }
      })
    , 200)

  const clearSearch = () => {
    (query !== "") && setQuery("")
    setResults([])
    resetLoading()
    focusOut()
  }
  ref.current = { clear: clearSearch }
  const onInputChange = ({ nativeEvent: { keyCode }, target: { value } }) => {
    (query !== value) && setQuery(queryVar = value);
    if (value === "") {
      setResults([])
    } else {
      (value.trim().length > 2) && debouncedSearch(value.trim())
    }
  }
  const onKeyUp = ({ nativeEvent: { keyCode }, target }) => {
    if (keyCode === 27) {
      clearSearch()
      target.blur()
      return
    }
    if (keyCode === 13 && results.length) {
      select(results[0])()
      return
    }
  }

  const select = (result) => () => {
    clearSearch()
    onSelect(result)
  }
  const focus = () => setFocused(true)
  const focusOut = () => setFocused(false)
  return <Fragment>
    <div className={classNames("backdrop", { on: isFocused })} onClick={clearSearch} />
    <div className="SearchContainer">
      <div className={classNames(className, 'Search', { disabled, loading, error, on: isFocused })}>
        <div className="Input">
          <Icon icon="search" />
          <input
            autoComplete="off"
            spellCheck="false"
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={onInputChange}
            onKeyUp={onKeyUp}
            onFocus={focus}
            tabIndex={1} />
          {children}
        </div>
        <div className={classNames("Results", { hasResult: results.length })}>
          {
            results.map((result, key) =>
              <div key={key} className="Result" tabIndex={1} item={result} onClick={select(result)}>
                {renderer(result)}
              </div>
            )
          }
        </div>
      </div>
    </div>
  </Fragment>
})
