// @flow
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
// orientEverythingToTheClickCube()
//------------------------------------------------------------------
export const orientEverythingToTheClickCube = () => {
  // Get the direction in which the camera is looking
  const vector = new THREE.Vector3();
  gState().get("scnData").camera.getWorldDirection(vector);
  const radians = Math.atan2(vector.x, vector.z);
  // Rotate the group on the Y axis (around it's centre, always the 0,0,0 point)
  gState().get("clckCbGroup").rotateY(radians);
  // --------------------------------------------------------------
  // ! AUTOMODE
  // --------------------------------------------------------------
  if (!gSttngs().get("autoMode")) {
    // Last thing: set the position of the cube based on the location of  the reticle
    gState()
      .get("clckCbGroup")
      .position.setFromMatrixPosition(
        gState().get("scnData").reticleStuff.reticle.matrix,
      );
  }
  // --------------------------------------------------------------
  // AUTOMODE
  // --------------------------------------------------------------
  if (gSttngs().get("autoMode")) {
    gState()
      .get("clckCbGroup")
      .rotateY(90 * (Math.PI / 180));
  }
};
export default orientEverythingToTheClickCube;
