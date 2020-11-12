import { config, uniqueKeys } from "@utils"
import { useDisk, Disk } from "@data"
import { AFavouritesManager, Icon } from "@components"
import { City } from "@views"

import "./Home.sass"

export const Home = () => {
  const Favourites = AFavouritesManager("cities")
  const [cityList, setCityList] = useDisk("cityList", config.initialCities)

  Disk.visibleCities = uniqueKeys([...cityList, ...Favourites.list])

  const removeFromList = (city) => (e) => {
    e.stopPropagation()
    setCityList(cityList.filter(i => i != city))
  }
  return <div className="Home">
    {
      !!Favourites.list.length
      && <div className="Favourites">
        <h2> Favourites </h2>
        {
          Favourites.list
            .sort()
            .map((city) =>
              <City key={city} name={city} fav={Favourites.icon[city]} />)
        }
      </div>
    }
    <div className="InitialCities">
      {
        cityList
          .filter(city => Favourites.list.indexOf(city) < 0)
          .sort()
          .map((city) =>
            <City
              key={city}
              name={city}
              fav={Favourites.icon[city]}
              remove={<Icon icon="times" className="remove" onClick={removeFromList(city)} />}
            />)
      }
    </div>
  </div>
}