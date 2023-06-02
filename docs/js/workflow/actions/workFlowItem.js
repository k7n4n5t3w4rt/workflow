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

export default () /*: Object */ => {
  // Cubes in a group can be rotated / scaled etc as a group
  // const workFlowItemsGroup = new THREE.Group();
  const cellColour = 255;
  const geometry = new THREE.BoxGeometry(
    gSettings().xCm,
    gSettings().yCm,
    gSettings().zCm,
  );

  const material = new THREE.MeshBasicMaterial({
    color: `rgb(${cellColour},${cellColour},${cellColour})`,
  });
  const cube = new THREE.Mesh(geometry, material);

  // [1] Set the position and scene properties of the cube
  const nextCubeId = gState().objects.workFlowItems.length;
  cube.position.setFromMatrixPosition(
    gState().sceneData.reticleStuff.reticle.matrix,
  );
  cube.position.y = gSettings().yCm * 2;
  cube.position.z = cube.position.z + nextCubeId * -0.2;
  cube.bubble_value = cellColour;
  cube.castShadow = true;
  // [2] Set the status of the workFlowItem
  cube.status = gSettings().workflowStatuses[0];
  // [3] Set the effort value of the workFlowItem
  cube.effort = randomNumberBetween(
    gSettings().workflowItem.effort.min,
    gSettings().workflowItem.effort.max,
  );
  // [4] Set the team number of the workFlowItem
  cube.teamNumber = randomNumberBetween(1, gSettings().teamsNumber);
  // [5] Add the cube to the array of all workFlowItems
  gState().objects.workFlowItems.push(cube);
  return cube;
};

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
