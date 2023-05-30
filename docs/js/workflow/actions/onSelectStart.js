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
  const sceneData = globalState().sceneData;
  if (sceneData.reticleStuff.reticle.visible) {
    sceneData.reticleStuff.active = false;
  }

  const cubes = globalState().cubes;
  if (cubes.active === undefined || cubes.active === false) {
    // Build the grid of pixels
    cubes.clickCube = clickCube();
    sceneData.scene.add(cubes.clickCube);
    cubes.active = true;

    // Get the direction in which the camera is looking
    const vector = new THREE.Vector3();
    sceneData.camera.getWorldDirection(vector);
    const radians = Math.atan2(vector.x, vector.z);
    // Rotate the group on the Y axis (around it's centre, always the 0,0,0 point)
    cubes.clickCube.rotateY(radians);
    // Last thing: set the position of the cube based on the location of  the reticle
    cubes.clickCube.position.setFromMatrixPosition(
      sceneData.reticleStuff.reticle.matrix,
    );
  }

  click();
};
