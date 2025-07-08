/// <reference types="cypress" />

context("Default Preset", () => {
  it("should load the default preset on first run", () => {
    cy.visit("/");
    cy.clearLocalStorage();
    cy.visit("/");

    //-------------------------------------------------------------
    // TERMINAL LOG
    //-------------------------------------------------------------
    // cy.get("#start-button", { timeout: 10000 }).then(($startButton) => {
    //   cy.task("log", "1:" + $startButton.text());
    // });

    // cy.wait(1000);

    //-------------------------------------------------------------
    // TERMINAL LOG
    //-------------------------------------------------------------
    // cy.get("#start-button", { timeout: 10000 }).then(($startButton) => {
    //   cy.task("log", "2:" + $startButton.text());
    // });

    cy.get("#start-button", { timeout: 10000 }).should(
      "contain",
      "Example 0: No WIP Limit",
    );
  });
});
