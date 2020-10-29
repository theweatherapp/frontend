/// <reference types="cypress" />

const config = require('../../config/project.json')

const inFavouritesList = (city) => {
  cy.get('.appName').click()
  cy.get('.Favourites .City[city="' + city + '"]')
}
const notInFavouritesList = (city) => {
  cy.get('.appName').click()
  cy.get('.Favourites .City[city="' + city + '"]').should('have.not.exist')
}
const getResultFavouriteIcon = (city) =>
  cy.get('.Search .Results .Result[item="' + city + '"] .Fav')

const getResult = (city) =>
  cy.get('.Search .Results .Result[item="' + city + '"]')

context('Favourites Feature', () => {
  it('Loads Page', () => cy.visit(Cypress.config('url')))

  // https://on.cypress.io/interacting-with-elements
  it('Add some cities on default list to favourites', () => {
    // https://on.cypress.io/type
    const addToFavorites = (city) => {
      cy.get('.appName').click()
      cy.get('.InitialCities .City[city="' + city + '"]').click()
      cy.get('.CityDetails .Fav').click()
      return city
    }
    const inFavouritesList = (city) => {
      cy.get('.appName').click({ force: true })
      cy.get('.Favourites .City[city="' + city + '"]')
    }
    config.initialCities.slice(0, 4)
      .map(addToFavorites)
      .map(inFavouritesList)
  })
  it('Add city to favourites on search results', () => {
    const city = 'Austin'
    cy.get('.Search input').clear()
      .type(city)
    cy.wait(100)

    getResultFavouriteIcon(city).should('have.not.class', 'isFavourite')
    getResultFavouriteIcon(city).click()
    getResultFavouriteIcon(city).should('have.class', 'isFavourite')
    cy.get('.Search input').type("{esc}")
    inFavouritesList(city)
  })
  it('Remove city from favourites on search results', () => {
    const city = 'Austin'

    cy.get('.Search input')
      .clear()
      .type(city)
    getResultFavouriteIcon(city).should('have.class', 'isFavourite')
    getResultFavouriteIcon(city).click()
    getResultFavouriteIcon(city).should('have.not.class', 'isFavourite')
    cy.get('.Search input').type("{esc}")
    notInFavouritesList(city)
  })

  it('add/remove city to favourites on city details page', () => {
    const city = 'Texas City'

    cy.get('.Search input')
      .clear()
      .type(city)
    cy.wait(100)
    getResult(city).click()
    cy.get('.CityDetails .Fav')
      .should('have.not.class', 'isFavourite')
    cy.get('.CityDetails .Fav').click()
      .should('have.class', 'isFavourite')
    cy.get('.Search input').type("{esc}")
    inFavouritesList(city)
    cy.get('.Favourites .City[city="' + city + '"]').click()
    cy.wait(100)
    cy.get('.CityDetails .Fav')
      .should('have.class', 'isFavourite')
    cy.get('.CityDetails .Fav').click()
      .should('have.not.class', 'isFavourite')
    notInFavouritesList(city)
  })

})
