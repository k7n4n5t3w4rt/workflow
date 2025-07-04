/// <reference types="cypress" />

context('UI Visibility', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should show the correct elements on page load', () => {
    cy.get('#start-button').should('be.visible')
    cy.get('#share-icon').should('be.visible')
    cy.get('#linkedin-icon').should('be.visible')
    cy.get('#config-icon').should('be.visible')

    cy.get('#params-icon').should('not.be.visible')
    cy.get('#controls-icon').should('not.be.visible')
    cy.get('#home-icon').should('not.be.visible')
  })

  it('should show the correct elements after starting the simulation', () => {
    cy.get('#start-button').click()

    cy.get('#home-icon').should('be.visible')
    cy.get('#share-icon').should('be.visible')
    cy.get('#controls-icon').should('be.visible')
    cy.get('#params-icon').should('be.visible')

    cy.get('#linkedin-icon').should('not.be.visible')
    cy.get('#config-icon').should('not.be.visible')
    cy.get('#start-button').should('not.be.visible')
  })

  it('should show the correct elements when opening and closing the params overlay', () => {
    cy.get('#start-button').click()
    cy.get('#params-icon').click()

    cy.get('#params-close-icon').should('be.visible')
    cy.get('#params-container').should('be.visible')

    cy.get('#controls-icon').should('not.be.visible')
    cy.get('#share-icon').should('not.be.visible')
    cy.get('#home-icon').should('not.be.visible')
    cy.get('#params-icon').should('not.be.visible')

    cy.get('#params-close-icon').click()

    cy.get('#controls-icon').should('be.visible')
    cy.get('#share-icon').should('be.visible')
    cy.get('#home-icon').should('be.visible')
    cy.get('#params-icon').should('be.visible')

    cy.get('#params-container').should('not.be.visible')
  })

  it('should return to the initial state when the home button is clicked', () => {
    cy.get('#start-button').click()
    cy.get('#home-icon').click()

    cy.get('#start-button').should('be.visible')
    cy.get('#share-icon').should('be.visible')
    cy.get('#linkedin-icon').should('be.visible')
    cy.get('#config-icon').should('be.visible')

    cy.get('#params-icon').should('not.be.visible')
    cy.get('#controls-icon').should('not.be.visible')
    cy.get('#home-icon').should('not.be.visible')
  })
})
