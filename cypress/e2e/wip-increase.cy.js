describe("WIP Increase Test", () => {
  it("should show an increase in WIP over time", () => {
    const waitTime = 7000; // Adjust this value as needed

    // 1. Load the root page
    cy.visit("/");

    // 2. Select the third option from the dropdown
    cy.get("#shortcuts-container select", { timeout: 10000 })
      .find("option")
      .eq(3)
      .then((option) => {
        cy.get("#shortcuts-container select").select(option.val());
      });

    // // 3. Click the button to start the simulation
    cy.get("#start-button", { timeout: 10000 }).click();

    // // 3.1. Click the params icon to pull up the parameters
    cy.get("#params-icon", { timeout: 10000 }).click();

    cy.get('input[type="range"]#fps')
      .eq(0)
      .invoke("val", 10)
      .trigger("change", { force: true }); // or .trigger('input')

    // 5. Wait
    cy.wait(waitTime);

    // 4. Check the initial WIP value
    cy.get("#wip-running-total", { timeout: 1000 })
      .invoke("text")
      .then((text) => {
        const initialWip = parseInt(text.split(": ")[1], 10);
        cy.wrap(initialWip).as("wip1");
      });

    // 5. Wait
    cy.wait(waitTime);

    // 6. Check WIP again and assert it's larger
    cy.get("@wip1").then((wip1) => {
      cy.get("#wip-running-total", { timeout: 1000 })
        .invoke("text")
        .then((text) => {
          const wip2 = parseInt(text.split(": ")[1], 10);
          expect(wip2).to.be.gt(wip1);
          cy.wrap(wip2).as("wip2");
        });
    });

    // 7. Wait
    cy.wait(waitTime);

    // 8. Check WIP a final time and assert it's larger
    cy.get("@wip2").then((wip2) => {
      cy.get("#wip-running-total")
        .invoke("text")
        .then((text) => {
          const wip3 = parseInt(text.split(": ")[1], 10);
          expect(wip3).to.be.gt(wip2);
        });
    });
  });
});
