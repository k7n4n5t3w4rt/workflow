/// <reference types="cypress" />

context('Config Persistence', () => {
  it('should persist the config across page reloads', () => {
    cy.visit('/')
    cy.get('#shortcuts-container select')
      .find('option')
      .eq(4)
      .then(option => {
        cy.get('#shortcuts-container select').select(option.val())
      })
    cy.get('#display-name').then(($displayName) => {
      cy.log($displayName.text())
    })
    cy.get('#display-name', { timeout: 10000 }).should('contain', 'Example 3: Initiative WIP')
    cy.get('#config-icon').click()
    cy.get('#sid').clear().type('NewExample')
    cy.get('#displayName').clear().type('New Example')
    cy.get('#config-close-icon').click()
    cy.get('#display-name').should('contain', 'New Example')
    cy.visit('/')
    cy.get('#display-name').should('contain', 'New Example')
    cy.get('#config-icon').click()
    cy.get('#sid').should('have.value', 'NewExample')
  })
})
