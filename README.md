# The Weather App

Weather app that uses WeatherStack API.

[Pages](./docs/Pages.MD)

[Data Layer](./docs/DataLayer.MD)

[Components](./docs/Components.MD)

## App
App is running on GitHub Pages at 
[theweatherapp.github.io](https://theweatherapp.github.io/)

## Installation 
```bash
  git clone https://github.com/theweatherapp/frontend.git
  cd frontend
  npm install
```

## Commands

#### Start dev server
```bash
  npm start
```

#### Production Build

```bash
  npm run build
```

#### Analyze 

Builds and generates source-map, launches analyzer
```bash
  npm run analyze
```

#### Serve

```
  npm run build
  npm run serve
```
#### Test

```bash
  npm test
```
## Stack

- React Framework
- Sass
- Webpack as bundler
- Cypress as testing tool
- `@otag/disk` as localStorage broker
