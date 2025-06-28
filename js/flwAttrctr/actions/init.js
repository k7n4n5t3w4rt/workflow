// @flow
// Refer to copilot.md for TDD rules.
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import { OrbitControls } from "../../../web_modules/three/examples/jsm/controls/OrbitControls.js";
import { CSS2DRenderer } from "../../../web_modules/three/examples/jsm/renderers/CSS2DRenderer.js";
import { init2D } from "./init.js_init2D.js";
import { init3D } from "./init.js_init3D.js";
// Also used in the ARButton.js file
import start from "./start.js";
// Actions only used in this file
import cameraSetup from "./init.js_cameraSetup.js";
import onWindowResize from "../actions/init.js_onWindowResize.js";
import addReticleToScene from "./init.js_addReticleToScene.js";
import render from "./init.js_render.js";
import addArContainerToDom from "./init.js_addArContainerToDom.js";
import rendererSetup from "./init.js_rendererSetup.js";
import labelRendererSetup from "./init.js_labelRendererSetup.js";
import startButtonSetup from "./init.js_startButtonSetup.js";

//------------------------------------------------------------------
// FUNCTION: init()
//------------------------------------------------------------------
export const init = () /*: void */ => {
  const x = gSttngs().get("x");
  const y = gSttngs().get("y");
  const z = gSttngs().get("z");
  if (x === undefined || y === undefined || z === undefined) {
    setTimeout(init, 1000);
    return;
  }
  // Create the renderer once and pass to both 2D and 3D initializers
  const renderer = rendererSetup();
  startButtonSetup(renderer, init2D, init3D);
};
export default init;
