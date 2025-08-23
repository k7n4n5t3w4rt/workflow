// @flow
/*::
declare var cy: any;
declare var Cypress: any;
declare function describe(name: string, fn: () => mixed): void;
declare function it(name: string, fn: () => mixed): void;
*/

// TDD spec: Verify start button rendering logic
// - If AR is supported: both AR button and 3D button should be visible
// - If AR is not supported: only the 3D button should be visible

describe("Start Buttons Rendering", () => {
  const visitWithARSupport = (supported /*: boolean */) => {
    cy.visit("/", {
      onBeforeLoad(win) {
        // Robustly stub navigator.xr and its isSessionSupported method
        const xr = (win.navigator && win.navigator.xr) || {};
        // Always override the method to return the desired support flag
        // $FlowFixMe[prop-missing]
        xr.isSessionSupported = () => Promise.resolve(!!supported);
        try {
          Object.defineProperty(win.navigator, "xr", {
            value: xr,
            configurable: true,
          });
        } catch (e) {
          try {
            // $FlowFixMe[cannot-write]
            win.navigator.xr = xr;
          } catch (e2) {
            // ignore; tests may fail if we cannot stub
          }
        }
      },
    });
  };

  it("shows both AR and 3D start buttons when AR is supported", () => {
    visitWithARSupport(true);
    // 3D start button should exist
    cy.get("#start-button-3d", { timeout: 15000 }).should("exist");
    // AR button should exist
    cy.get("#ARButton", { timeout: 15000 }).should("exist");
  });

  it("shows only the 3D start button when AR is not supported", () => {
    visitWithARSupport(false);
    // 3D start button should exist
    cy.get("#start-button-3d", { timeout: 15000 }).should("exist");
    // AR button should not exist
    cy.get("#ARButton").should("not.exist");
  });
});
