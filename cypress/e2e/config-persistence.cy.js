/// <reference types="cypress" />

context("Config Persistence", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("should persist the config across page reloads", () => {
    cy.visit("/");
    cy.get("#shortcuts-container select", { timeout: 10000 })
      .find("option")
      .eq(4)
      .then((option) => {
        cy.get("#shortcuts-container select").select(option.val());
      });

    //-------------------------------------------------------------
    // TERMINAL LOG
    //-------------------------------------------------------------
    // cy.get("#start-button", { timeout: 10000 }).then(($startButton) => {
    //   cy.task("log", "1:" + $startButton.text());
    // });

    cy.get("#start-button", { timeout: 10000 }).should(
      "contain",
      "Example 3: Initiative WIP",
    );

    //-------------------------------------------------------------
    // TERMINAL LOG
    //-------------------------------------------------------------
    // cy.get("#start-button", { timeout: 10000 }).then(($startButton) => {
    //   cy.task("log", "2:" + $startButton.text());
    // });

    cy.get("#config-icon", { timeout: 10000 }).click();
    cy.get("#sid", { timeout: 10000 }).clear().type("NewExample");
    cy.get("#displayName", { timeout: 10000 }).clear().type("New Example");
    cy.get("#config-close-icon", { timeout: 10000 }).click();

    //-------------------------------------------------------------
    // TERMINAL LOG
    //-------------------------------------------------------------
    // cy.get("#start-button", { timeout: 10000 }).then(($startButton) => {
    //   cy.task("log", "3:" + $startButton.text());
    // });

    cy.get("#start-button", { timeout: 10000 }).then(($startButton) => {
      cy.log("Checking: ", $startButton.text());
    });

    cy.get("#start-button", { timeout: 10000 }).should(
      "contain",
      "New Example",
    );

    //-------------------------------------------------------------
    // TERMINAL LOG
    //-------------------------------------------------------------
    // cy.get("#start-button", { timeout: 10000 }).then(($startButton) => {
    //   cy.task("log", "4:" + $startButton.text());
    // });

    cy.visit("/");

    //-------------------------------------------------------------
    // TERMINAL LOG
    //-------------------------------------------------------------
    // cy.get("#start-button", { timeout: 10000 }).then(($startButton) => {
    //   cy.task("log", "5:" + $startButton.text());
    // });

    cy.get("#start-button", { timeout: 10000 }).should(
      "contain",
      "New Example",
    );
    cy.get("#config-icon", { timeout: 10000 }).click();
    cy.get("#sid", { timeout: 10000 }).should("have.value", "NewExample");
  });
});
