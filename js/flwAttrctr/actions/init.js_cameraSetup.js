// @flow
// Refer to copilot.md for TDD rules.
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
// Do the rest of the imports
import * as THREE from "three";
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
  camera.position.z = 1.5;
  camera.position.y = gSttngs().get("y");
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
