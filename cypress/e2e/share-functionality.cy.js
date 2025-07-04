/// <reference types="cypress" />

context('Share Functionality', () => {
  it('should load a shared configuration', () => {
    cy.visit('/')

    // Select the option with index 3
    cy.get('#shortcuts-container select')
      .find('option')
      .eq(3)
      .then(option => {
        const shareUrl = option.val()
        cy.get('#shortcuts-container select').select(shareUrl)

        // Get the expected display name and sid from the shareUrl
        const url = new URL(shareUrl, window.location.origin)
        const shareData = JSON.parse(atob(url.searchParams.get('share')))
        const expectedDisplayName = shareData.displayName
        const expectedSid = shareData.sid

        // Click the Share icon and close the popup
        cy.get('#share-icon').click()
        cy.on('window:alert', (str) => {
          expect(str).to.contain('URL with shared settings copied to clipboard')
        })
        cy.on('window:confirm', () => true)

        // Select the option with index 4 to change the state
        cy.get('#shortcuts-container select')
          .find('option')
          .eq(4)
          .then(option4 => {
            cy.get('#shortcuts-container select').select(option4.val())
          })

        // Visit the share URL from the 3rd option
        cy.visit(shareUrl)

        // Check that the DisplayName and Sid value match
        cy.get('#start-button').should('contain', expectedDisplayName)
        cy.get('#config-icon').click()
        cy.get('#sid').should('have.value', expectedSid)
    })
  })
})
