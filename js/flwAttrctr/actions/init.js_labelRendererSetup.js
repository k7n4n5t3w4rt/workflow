// @flow
// Refer to copilot.md for TDD rules.
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import { CSS2DRenderer } from "../../../web_modules/three/examples/jsm/renderers/CSS2DRenderer.js";

//------------------------------------------------------------------
// labelRendererSetup()
//------------------------------------------------------------------
const labelRendererSetup = () /*: Object */ => {
  const labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.domElement.style.position = "absolute";
  labelRenderer.domElement.style.top = "0";
  labelRenderer.domElement.style.pointerEvents = "none";
  labelRenderer.domElement.id = "label-renderer";
  const domOverlayDiv = document.getElementById("dom-overlay");
  if (domOverlayDiv !== null) {
    domOverlayDiv.appendChild(labelRenderer.domElement);
  }
  return labelRenderer;
};

export default labelRendererSetup;
