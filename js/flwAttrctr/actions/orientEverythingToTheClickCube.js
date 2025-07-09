// @flow
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
import * as THREE from "three";
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs";
import gState from "./gState";
//------------------------------------------------------------------
// orientEverythingToTheClickCube()
//------------------------------------------------------------------
export const orientEverythingToTheClickCube = () /*: number */ => {
  // Get the direction in which the camera is looking
  const vector = new THREE.Vector3();
  gState().get("scnData").camera.getWorldDirection(vector);
  let radians = Math.atan2(vector.x, vector.z);
  // Rotate the group on the Y axis (around it's centre, always the 0,0,0 point)
  gState().get("clckCbGroup").rotation.y = radians;
  // --------------------------------------------------------------
  // ! AUTOMODE
  // --------------------------------------------------------------
  if (gSttngs().get("autoMode") === false) {
    // Last thing: set the position of the cube based on the location of the reticle
    const scnData = gState().get("scnData");
    const reticleStuff = scnData && scnData.reticleStuff;
    if (reticleStuff && reticleStuff.reticle && reticleStuff.reticle.matrix) {
      gState()
        .get("clckCbGroup")
        .position.setFromMatrixPosition(reticleStuff.reticle.matrix);
    }
  }
  // --------------------------------------------------------------
  // AUTOMODE
  // --------------------------------------------------------------
  if (gSttngs().get("autoMode")) {
    gState()
      .get("clckCbGroup")
      .rotateY(90 * (Math.PI / 180));
  }
  return radians;
};
export default orientEverythingToTheClickCube;
