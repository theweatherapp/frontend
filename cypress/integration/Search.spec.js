/// <reference types="cypress" />
const config = require('../../config/project.json')

const getCity = (city) => cy.get('.InitialCities .City[city="' + city + '"]')
context('Search Feature', () => {

  it('Loads Page', () => {
    cy.visit(Cypress.config('url'))
    cy.get('.Search')
    cy.get('.Search input').should('not.have.value')
  })

  it('UX: Backdrop, ESC', () => {
    cy.get('.Search input').click()
    cy.get('.backdrop').should('have.class', 'on')
    cy.get('.Search input').type("{esc}")
    cy.get('.backdrop').should('have.not.class', 'on')
    cy.get('.Search input').type('Austin')
    cy.get('.Search input').type('{esc}')
    cy.get('.Search input').should('not.have.value')
  })
  it('Type and search, go to city', () => {
    cy.get('.Search input').clear().type('Austin')
    cy.get('.Search .Results .Result[item="Austin"]').click()
    cy.get('.CityDetails')
    cy.get('.CityDetails h1 a').should('contain', 'Austin')
    cy.window().then(w => expect(w.location.pathname).to.contain('Austin'))
    cy.get('.Search .Results .Result[item="Austin"]').should('have.not.exist')
  })
  it('Type and enter to select city', () => {
    cy.get('.appName').click()
    cy.get('.Search input').clear().type('Texas City')
    cy.wait(1000)
    cy.get('.Search input').type('{enter}')
    cy.get('.CityDetails')
    cy.get('.CityDetails h1 a').should('contain', 'Texas City')
  })
  it('Get Location', () => {
    const latitude = 41.38879;
    const longitude = 2.15899;
    cy.window().then(win => {
      cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((cb) => {
        return cb({ coords: { latitude, longitude } });
      });
      cy.get('.UserLocation').click()
      cy.wait(3000)
      cy.get('.Search .userCity').then((el) => {
        const userCity = el[0].innerText
        expect(win.location.pathname).to.contain(userCity)
        cy.get('.CityDetails h1 a').should('contain', userCity)
      })
    })

  })
  it('Click user city to view details', () => {
    cy.get('.Search .userCity').then((el) => {
      const userCity = el[0].innerText
      cy.get('.appName').click()
      cy.get('.Search .userCity').click()
      cy.get('.CityDetails h1 a').should('contain', userCity)
    })
  })
})
