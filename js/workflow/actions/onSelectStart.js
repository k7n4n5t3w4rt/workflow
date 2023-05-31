// @flow
// --------------------------------------------------
// THREE.js
// --------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
// --------------------------------------------------
// GLOBALS
// --------------------------------------------------
import globalSettings from "./globalSettings.js";
import globalState from "./globalState.js";
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import workFlowItem from "./workFlowItem.js";
import clickCube from "./clickCube.js";
import click from "./click.js";

export default () /*: () => void */ => () /*: void */ => {
  if (globalState().sceneData.reticleStuff.reticle.visible) {
    globalState().sceneData.reticleStuff.active = false;
  }

  if (
    globalState().cubes.active === undefined ||
    globalState().cubes.active === false
  ) {
    // Build the grid of pixels
    globalState().cubes.clickCube = clickCube();
    globalState().sceneData.scene.add(globalState().cubes.clickCube);

    // Get the direction in which the camera is looking
    const vector = new THREE.Vector3();
    globalState().sceneData.camera.getWorldDirection(vector);
    const radians = Math.atan2(vector.x, vector.z);
    // Rotate the group on the Y axis (around it's centre, always the 0,0,0 point)
    globalState().cubes.clickCube.rotateY(radians);
    // Last thing: set the position of the cube based on the location of  the reticle
    globalState().cubes.clickCube.position.setFromMatrixPosition(
      globalState().sceneData.reticleStuff.reticle.matrix,
    );
  }

  click();
};
