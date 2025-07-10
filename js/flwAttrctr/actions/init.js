// @flow
// Refer to copilot.md for TDD rules.
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
import * as THREE from "three";
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import { init2D } from "./init.js_init2D.js";
import { init3D } from "./init.js_init3D.js";
// Actions only used in this file
import rendererSetup from "./init.js_rendererSetup.js";
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
