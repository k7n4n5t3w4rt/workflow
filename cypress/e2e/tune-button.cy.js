
describe("Tune Button Functionality", () => {
  it("should update the Dev Power Fix slider when the Tune button is clicked", () => {
    cy.visit("/");
    cy.get("#config-icon", { timeout: 10000 }).should("be.visible").click();

    // Get the initial value of the slider
    cy.get("#devPowerFix").invoke("val").as("initialDevPowerFix");

    // Set a new target and click the tune button
    cy.get("#targetFlowTime").clear().type("50");
    cy.get('[data-cy="tune-button"]').click({ force: true });

    // Assert that the value has changed from its initial state.
    // Cypress will automatically retry this assertion until it passes or times out.
    cy.get("@initialDevPowerFix").then((initialValue) => {
      cy.get("#devPowerFix", { timeout: 10000 })
        .invoke("val")
        .should("not.eq", initialValue);
    });
  });
});
