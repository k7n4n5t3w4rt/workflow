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
  // [0] Set the name to the uuid so we can delete it later
  cube.name = cube.uuid;
  // [1] Set the position and scene properties of the cube
  cube.position.x = gState().objects.startPosition.x;
  cube.position.z = gState().objects.startPosition.z - Math.random();
  cube.position.y = gState().objects.startPosition.y + Math.random();
  // Math.round(Math.random()) will give you 0 or 1
  // Multiplying the result by 2 will give you 0 or 2
  // And then subtracting 1 gives you -1 or 1.
  cube.position.x =
    cube.position.x + Math.random() * Math.round(Math.random()) * 2 - 1;
  cube.bubble_value = cellColour;
  cube.castShadow = true;
  // [2] Set the status of the workFlowItem
  cube.status = gSettings().workflowStatuses[0];
  // [3] Set the effort values of the workFlowItem
  cube.effortTotal = randomNumberBetween(
    gSettings().workflowItem.effort.min,
    gSettings().workflowItem.effort.max,
  );
  cube.effortRemaining = cube.effortTotal;
  // [4] Set the workflowStatusesIndex so we can pull the
  // status info from the gSettings().workflowStatuses array
  cube.workflowStatusesIndex = 0;
  // [5] Set the team number of the workFlowItem
  cube.teamNumber = randomNumberBetween(1, gSettings().teamsNumber);
  // [6] Add the cube to the array of all workFlowItems
  gState().objects.workFlowItems.push(cube);
  return cube;
};

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
