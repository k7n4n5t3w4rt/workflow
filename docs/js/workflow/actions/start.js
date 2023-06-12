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
// IMPORT: HELPERS
//------------------------------------------------------------------
import clckCbGroup from "./newClickCube.js";
import click from "./click.js";
import newVSphere from "./newVSphere.js";

export default () /*: () => void */ => () /*: void */ => {
  hideReticule();
  createClickCube();
  orientEverythingToTheClickCube();
  setStartPosition();
  setEndPosition();
  createValueSphere();
  // Start the clubes flying
  click();
};

//------------------------------------------------------------------
// hideReticule()
//------------------------------------------------------------------
const hideReticule = () /*: void */ => {
  // Hide the reticle
  if (gState().scnData.reticleStuff.reticle.visible) {
    gState().scnData.reticleStuff.active = false;
  }
};
//------------------------------------------------------------------
// createClickCube()
//------------------------------------------------------------------
const createClickCube = () /*: void */ => {
  // Create the clckCube
  gState().clckCbGroup = clckCbGroup();
  gState().scnData.scene.add(gState().clckCbGroup);
};
//------------------------------------------------------------------
// orientEverythingToTheClickCube()
//------------------------------------------------------------------
const orientEverythingToTheClickCube = () /*: void */ => {
  // Get the direction in which the camera is looking
  const vector = new THREE.Vector3();
  gState().scnData.camera.getWorldDirection(vector);
  const radians = Math.atan2(vector.x, vector.z);
  // Rotate the group on the Y axis (around it's centre, always the 0,0,0 point)
  gState().clckCbGroup.rotateY(radians);
  // Last thing: set the position of the cube based on the location of  the reticle
  gState().clckCbGroup.position.setFromMatrixPosition(
    gState().scnData.reticleStuff.reticle.matrix,
  );
};
//------------------------------------------------------------------
// setStartPosition()
//------------------------------------------------------------------
const setStartPosition = () /*: void */ => {
  // Set the start position for all the flw items
  // based on where we put the cube, but higher up
  gState().strtPosition = gState().clckCbGroup.clckCube.position.clone();
  gState().strtPosition.y = gSttngs().yOffset;
};
//------------------------------------------------------------------
// setEndPosition()
//------------------------------------------------------------------
const setEndPosition = () /*: void */ => {
  gState().endPosition = gState().strtPosition.clone();
  gState().endPosition.z +=
    gSttngs().step * (gSttngs().flwSteps.length + 2) * -1;
};
//------------------------------------------------------------------
// createValueSphere()
//------------------------------------------------------------------
const createValueSphere = () /*: void */ => {
  // Create the valueSphere
  gState().vSphere = newVSphere();
  gState().vSphere.dRllngTtlVolume = 0;
  gState().vSphere.dRadius = 0;
  gState().vSphere.position.x = 0;
  gState().vSphere.position.y = gState().endPosition.y;
  gState().vSphere.position.z = gState().endPosition.z;
  gState().vSphere.dPosition.x = 0;
  gState().vSphere.dPosition.y = gState().endPosition.y;
  gState().vSphere.dPosition.z = gState().endPosition.z;
  gState().clckCbGroup.add(gState().vSphere);
};
