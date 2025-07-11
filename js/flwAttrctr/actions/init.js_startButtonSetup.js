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

  if (!arSupported) {
    // Create a button for 2D experience
    const button = document.createElement("button");
    button.innerHTML = gSttngs().get("displayName") || "START";
    button.id = "start-button";
    button.style.cssText = `
      position: absolute;
      bottom: 24px;
      padding: 20px 40px;
      border: none;
      border-radius: 8px;
      background: #4CAF50;
      color: #fff;
      font: bold 20px sans-serif;
      text-align: center;
      opacity: 1;
      outline: none;
      z-index: 999;
      cursor: pointer;
      left: 50%;
      transform: translateX(-50%);
      outline: 1px solid white;
    `;
    button.addEventListener("click", () => {
      if (typeof on2DStart === "function") {
        hideLandingPageElementsShowSceneElements();
        on2DStart(renderer);
      } else {
        // Show 2D message fallback
        const messageDiv = document.createElement("div");
        messageDiv.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 2rem;
          border-radius: 8px;
        `;
        messageDiv.innerHTML = `
          <h2>2D Experience</h2>
          <p>Augmented Reality is not supported on this device.<br>You are viewing the 2D desktop experience.</p>
        `;
        if (document.body) {
          document.body.appendChild(messageDiv);
        }
      }
    });
    domOverlayDiv.appendChild(button);
  } else {
    // Call the 3D/AR experience setup if provided
    if (typeof on3DStart === "function") {
      on3DStart(renderer);
    }
    // Create AR button for supported devices
    const button = ARButton.createButton(renderer, {
      requiredFeatures: ["hit-test"],
      optionalFeatures: ["dom-overlay"],
      domOverlay: {
        root: domOverlayDiv,
      },
    });
    // Append the AR button to the overlay, making sure it's defined
    if (button !== undefined) {
      domOverlayDiv.appendChild(button);
    }
  }
};

export default startButtonSetup;
