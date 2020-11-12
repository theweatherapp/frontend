import classNames from "classnames"
import { Icon } from "@components"
import { stopPropagation, config } from "@utils"
import { useUserDisk } from "@data"
import "./FavouriteIcon.sass"

/** 
 * @description
 *   (Abstract Component)FavouritesManager provides Favourite Icon and Favourites List.
 * 
 * @return {{
 *   list: string[], 
 *   icon: {[itemName: string]: JSX.Element}
 * }}
 */
export const AFavouritesManager = (namespace) => {
  const [favourites, setFavourites] = useUserDisk([config.namespaces.favourites, namespace].join("/"), [])

  const has = (item) => favourites.indexOf(item) > -1
  const add = (item) => setFavourites([...favourites, item])
  const remove = (item) => setFavourites(favourites.filter(i => i !== item))

  // switch favourite status
  const onIconClick = (item) =>
    (e) => {
      e.stopPropagation()
      has(item)
        ? remove(item)
        : add(item)
    }

  return {
    list: favourites,
    icon: new Proxy({}, {
      get: (target, key) =>
        <Icon
          icon="star"
          className={classNames("Fav", { isFavourite: has(key) })}
          onClick={onIconClick(key)} />
    })
  }
}