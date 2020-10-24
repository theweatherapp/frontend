[Documentation Home](../README.MD)

## Data Layer

- WeatherStack as City Search/Real-time Weather Service.
- Uses browsers native `fetch` API to connect WeatherStack API.
- Uses `@otag/disk` to cache information (a library that encapsulates local storage).
- ServiceWorker to enhance speed and offline functionality
- Keys are stored with namespaces such as "user", "weather", "city"...
- These namespaces can be specified in project config.
