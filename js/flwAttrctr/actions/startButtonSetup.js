// @flow
// Refer to copilot.md for TDD rules.
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import ARButton from "./ARButton.js";

//------------------------------------------------------------------
// startButtonSetup()
//------------------------------------------------------------------
const startButtonSetup = (renderer /*: Object */) /*: Object */ => {
  // The overlay for sliders, etc
  const domOverlayDiv = document.getElementById("dom-overlay");

  const button = ARButton.createButton(renderer, {
    requiredFeatures: ["hit-test"],
    optionalFeatures: ["dom-overlay"],
    domOverlay: {
      root: domOverlayDiv,
    },
  });
  // $FlowFixMe
  domOverlayDiv.appendChild(button);
};

export default startButtonSetup;
