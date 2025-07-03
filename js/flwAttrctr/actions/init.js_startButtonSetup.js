// @flow
// Refer to copilot.md for TDD rules.
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import ARButton from "./ARButton.js";
import hideLandingPageElements from "./hideLandingPageElements.js";

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
    button.innerHTML = "START";
    button.id = "start-button";
    button.style.cssText = `
      position: absolute;
      bottom: 24px;
      padding: 12px 24px;
      border: 1px solid #fff;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.1);
      color: #fff;
      font: normal 13px sans-serif;
      text-align: center;
      opacity: 0.5;
      outline: none;
      z-index: 999;
      cursor: pointer;
      left: 50%;
      transform: translateX(-50%);
    `;
    button.addEventListener("click", () => {
      if (typeof on2DStart === "function") {
        hideLandingPageElements();
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
