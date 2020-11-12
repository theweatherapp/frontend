export const WeatherError = ({ city }) =>
  <div className="WeatherError">
    <h1>An error occured</h1>
    <pre>Requested city "{city}" may not exist.</pre>
  </div>