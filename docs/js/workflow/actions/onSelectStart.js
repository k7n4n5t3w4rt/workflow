// @flow
// --------------------------------------------------
// THREE.js
// --------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
// --------------------------------------------------
// GLOBALS
// --------------------------------------------------
import gSettings from "./gSettings.js";
import gState from "./gState.js";
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import clickCube from "./clickCube.js";
import click from "./click.js";
import createValueSphere from "./createValueSphere.js";

export default () /*: () => void */ => () /*: void */ => {
  // Hide the reticle
  if (gState().sceneData.reticleStuff.reticle.visible) {
    gState().sceneData.reticleStuff.active = false;
  }

  // Create the clickCube
  gState().objects.clickCube = clickCube();
  gState().sceneData.scene.add(gState().objects.clickCube);
  // Get the direction in which the camera is looking
  const vector = new THREE.Vector3();
  gState().sceneData.camera.getWorldDirection(vector);
  const radians = Math.atan2(vector.x, vector.z);
  // Rotate the group on the Y axis (around it's centre, always the 0,0,0 point)
  gState().objects.clickCube.rotateY(radians);
  // Last thing: set the position of the cube based on the location of  the reticle
  gState().objects.clickCube.position.setFromMatrixPosition(
    gState().sceneData.reticleStuff.reticle.matrix,
  );

  // Set the start position for all the workflow items
  // based on where we put the cube, but higher up
  gState().objects.startPosition = gState().objects.clickCube.position.clone();
  gState().objects.startPosition.y = 0;

  // Create the valueSphere
  gState().objects.valueSphere = createValueSphere();
  gState().sceneData.scene.add(gState().objects.valueSphere);
  gState().objects.valueSphere.position.setFromMatrixPosition(
    gState().sceneData.reticleStuff.reticle.matrix,
  );
  gState().objects.valueSphere.position.y = gState().objects.startPosition.y;
  gState().objects.valueSphere.position.z +=
    gSettings().stepCm * gSettings().workflowSteps.length;

  // Start the clubes flying
  click();
};
