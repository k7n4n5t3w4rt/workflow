// @flow
// Refer to copilot.md for TDD rules.
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
// Do the rest of the imports
import * as THREE from "../../../web_modules/three.js";
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";

//------------------------------------------------------------------
// cameraSetup2D()
//------------------------------------------------------------------
export const cameraSetup2D = () /*: Object */ => {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.01,
    50,
  );
  camera.position.z = 0.68;
  camera.position.y = 0.3 * gSttngs().get("y");
  camera.position.x = Math.abs(parseInt(5 / 2)) * gSttngs().get("x");
  return camera;
};

// cameraSetupAR()
//------------------------------------------------------------------
export const cameraSetupAR = () /*: Object */ => {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.01,
    50,
  );
  // AR mode: leave camera at default position (origin)
  return camera;
};

// For backward compatibility, default export is 2D setup
export default cameraSetup2D;
