// @flow
// Refer to copilot.md for TDD rules.
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import ARButton from "./ARButton.js";
import hideLandingPageElementsShowSceneElements from "./hideLandingPageElementsShowSceneElements.js";

//------------------------------------------------------------------
// startButtonSetup()
//------------------------------------------------------------------
const startButtonSetup = async (
  renderer /*: Object */,
  on2DStart /*: ?(r: Object) => void */ = null,
  on3DStart /*: ?(r: Object) => void */ = null,
) /*: Promise<void> */ => {
  // The overlay for sliders, etc
  const domOverlayDiv = document.getElementById("dom-overlay");
  if (!domOverlayDiv) return;

  // Check if AR is supported
  let arSupported = false;
  // $FlowFixMe
  if (navigator.xr && navigator.xr.isSessionSupported) {
    try {
      // $FlowFixMe
      arSupported = await navigator.xr.isSessionSupported("immersive-ar");
    } catch (e) {
      arSupported = false;
    }
  }

  // Create a button for 2D experience
  const buttonScreen = document.createElement("button");
  buttonScreen.innerHTML = gSttngs().get("displayName") || "START";
  buttonScreen.id = "start-button";
  buttonScreen.style.cssText = `
      width: 50%;
      display: flex,
      justify-content: center;
      align-items: flex-start;
      margin: 0 25%;
      padding: 20px 40px;
      border: none;
      border-radius: 8px;
      background: #4CAF50;
      color: #fff;
      font: bold 20px sans-serif;
      text-align: center;
      opacity: 1;
      outline: none;
      cursor: pointer;
      outline: 1px solid white;
    `;
  buttonScreen.addEventListener("click", () => {
    if (typeof on2DStart === "function") {
      hideLandingPageElementsShowSceneElements();
      on2DStart(renderer);
    }
  });
  domOverlayDiv.appendChild(buttonScreen);
  if (arSupported) {
    // Call the 3D/AR experience setup if provided
    if (typeof on3DStart === "function") {
      on3DStart(renderer);
    }
    // Create AR button for supported devices
    const buttonAr = ARButton.createButton(renderer, {
      requiredFeatures: ["hit-test"],
      optionalFeatures: ["dom-overlay"],
      domOverlay: {
        root: domOverlayDiv,
      },
    });
    // Append the AR button to the overlay, making sure it's defined
    if (buttonAr !== undefined) {
      domOverlayDiv.appendChild(buttonAr);
    }
  }
};

export default startButtonSetup;
