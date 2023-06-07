// @flow
// --------------------------------------------------
// THREE.js
// --------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
// --------------------------------------------------
// GLOBALS
// --------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import clickCubeGroup from "./newClickCube.js";
import click from "./click.js";
import createValueSphere from "./newVSphere.js";

export default () /*: () => void */ => () /*: void */ => {
  // Hide the reticle
  if (gState().scnData.reticleStuff.reticle.visible) {
    gState().scnData.reticleStuff.active = false;
  }

  // Create the clickCube
  gState().clickCubeGroup = clickCubeGroup();
  gState().scnData.scene.add(gState().clickCubeGroup);
  // Get the direction in which the camera is looking
  const vector = new THREE.Vector3();
  gState().scnData.camera.getWorldDirection(vector);
  const radians = Math.atan2(vector.x, vector.z);
  // Rotate the group on the Y axis (around it's centre, always the 0,0,0 point)
  gState().clickCubeGroup.rotateY(radians);
  // Last thing: set the position of the cube based on the location of  the reticle
  gState().clickCubeGroup.position.setFromMatrixPosition(
    gState().scnData.reticleStuff.reticle.matrix,
  );

  // Set the start position for all the flw items
  // based on where we put the cube, but higher up
  gState().startPosition = gState().clickCubeGroup.clickCube.position.clone();
  gState().startPosition.y = gSttngs().scale * 10;
  gState().endPosition = gState().startPosition.clone();
  gState().endPosition.z +=
    gSttngs().step * (gSttngs().flwSteps.length + 2) * -1;

  // Create the valueSphere
  gState().vSphere = createValueSphere();
  gState().vSphere.dRllngTtlVolume = 0;

  // gState().scnData.scene.add(gState().vSphere);
  gState().clickCubeGroup.add(gState().vSphere);
  // gState().vSphere.position.setFromMatrixPosition(
  //   gState().scnData.reticleStuff.reticle.matrix,
  // );
  gState().vSphere.position.y = gState().endPosition.y;
  gState().vSphere.position.z = gState().endPosition.z;

  // Start the clubes flying
  click();
};
