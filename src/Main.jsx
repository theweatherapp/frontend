import { Route, Router, Switch } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Home, CityDetails } from "@pages"
import { CitySearch } from "@components"
import { config, useRedirect, navigate, navigateTo, history, withParamsDecorator } from "@utils"
import { useWeatherUpdater } from "@data"
import { ErrorView } from "@views"
import "./Main.sass"


// Shell of the application
export const Main = () => {
  useRedirect(/\?city=([a-zA-Z]+)/, navigate)
  useWeatherUpdater()
  return <Router history={history}>

    <div className="Header">
      <div className="appName" onClick={navigateTo("")}>
        <div className="appLogo" />
        {config.appName}
      </div>
      <CitySearch />
    </div>
    <ErrorView />
    <div className="Page">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/:city" component={withParamsDecorator(CityDetails)} />
      </Switch>
    </div>
    <ToastContainer />
  </Router>
}