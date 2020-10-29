/// <reference types="cypress" />
const config = require('../../config/project.json')

const city = config.initialCities[0]
const city2 = config.initialCities[1]
const getCity = (city) => cy.get('.InitialCities .City[city="' + city + '"]')
const isValueNumber = (selector) => cy.get(selector).then(el =>
  expect(isFinite(el[0].innerText.replace('%', ""))).to.eq(true))
context('City Details', () => {
  it('Loads Page', () => cy.visit(Cypress.config('url')))

  it('Has loaded city', () => {
    getCity(city).click()
    cy.get('.CityDetails')
  })

  it('Has Title', () => {
    cy.get('.CityDetails h1').should("contain", city)
  })
  it('Has Weather Details', () => {
    cy.wait(3000)
    isValueNumber(".CityDetails .temp .value b")
    isValueNumber(".CityDetails .wind .value b")
    isValueNumber(".CityDetails .humidity .value b")
    isValueNumber(".CityDetails .pressure .value b")
    isValueNumber(".CityDetails .visibility .value b")
    isValueNumber(".CityDetails .precip .value b")
  })
  it('Can take notes', () => {
    const city1Notes = "sample text1"
    const city2Notes = "sample text2"
    const getNotesInput = () => cy.get('.CityDetails .Notes textarea')
    getNotesInput().clear().type(city1Notes)
    cy.get('.appName').click()
    getCity(city2).click()
    getNotesInput().clear().type(city2Notes)
    cy.get('.appName').click()
    getCity(city).click()
    getNotesInput().should('have.value', city1Notes)
    cy.get('.appName').click()
    getCity(city2).click()
    getNotesInput().should('have.value', city2Notes)
  })
})
