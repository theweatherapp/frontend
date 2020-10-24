/// <reference types="cypress" />
const config = require('../../config/project.json')

const cityToAddFavourite = config.initialCities[2]
const cityToRemove = config.initialCities[3]

const getCity = (city) => cy.get('.InitialCities .City[city="' + city + '"]')
context('HomePage', () => {
  it('Loads Page', () => {
    cy.visit(Cypress.config('url'))
    cy.get('.Search')
    cy.get('.InitialCities')
  })

  it('Has loaded default cities', () =>
    config.initialCities.forEach((city) =>
      getCity(city)))

  it('Remove city from default cities list', () => {
    cy.get('.InitialCities .City[city="' + cityToRemove + '"] .remove').click()
    getCity(cityToRemove).should('not.exist')
  })

  it('Ensure other cities still on the list', () =>
    config.initialCities.filter(city => city != cityToRemove)
      .forEach((city) =>
        getCity(city)))

  it('Add a default city as favourite and check it is not on default city list anymore', () => {
    getCity(cityToAddFavourite).click()
    cy.get('.CityDetails .Fav').click()
    cy.get('.appName').click()
    getCity(cityToAddFavourite).should('not.exist')
    config.initialCities
      .filter(city => city != cityToAddFavourite)
      .forEach((city) =>
        getCity(city))
  })

  it('Remove default city from favourites and check it appears on default city list', () => {
    cy.get('.Favourites .City[city="' + cityToAddFavourite + '"] .Fav').click()
    cy.get('.Favourites .City[city="' + cityToAddFavourite + '"]').should('not.exist')
    getCity(cityToAddFavourite)
  })
})
