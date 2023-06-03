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
import randomPositiveOrNegative from "./randomPositiveOrNegative.js";
import randomNumberBetween from "./randomNumberBetween.js";

export default () /*: Object */ => {
  // Basic properties of the cube
  const geometry = new THREE.BoxGeometry(
    gSettings().xCm,
    gSettings().yCm,
    gSettings().zCm,
  );

  // Calculate the effortTotal for the workflowItem
  // ...before we finish with the geometry so that
  // we can use the value to set the scale of the cube
  // in the geometry which is efficient, apparently.
  const cubeEffortTotal = randomNumberBetween(
    gSettings().workflowItem.effort.min,
    gSettings().workflowItem.effort.max,
  );
  const scaleAdjustedForEffort =
    cubeEffortTotal / gSettings().workflowItem.effort.max;
  geometry.scale(
    scaleAdjustedForEffort,
    scaleAdjustedForEffort,
    scaleAdjustedForEffort,
  );

  // Make it white to start with
  const cellColour = 255;
  const material = new THREE.MeshBasicMaterial({
    color: `rgb(${cellColour},${cellColour},${cellColour})`,
  });

  // Create the cube
  const cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true;
  // Set the name to the uuid so we can delete it later
  cube.name = cube.uuid;

  // [1] Set the position
  cube.position.x =
    gState().objects.startPosition.x +
    Math.random() * randomPositiveOrNegative();
  cube.position.z = gState().objects.startPosition.z - Math.random();
  cube.position.y = gState().objects.startPosition.y + Math.random();
  // [2] Set the status of the workflowItem
  cube.status = gSettings().workflowStatuses[0];
  // [3] Set the effort values of the workflowItem
  cube.effortTotal = cubeEffortTotal;
  cube.effortRemaining = cube.effortTotal;
  // [5] Set the workflowStatusesIndex so we can pull the
  // status info from the gSettings().workflowStatuses array
  cube.workflowStatusesIndex = 0;
  // [5] Set the team number of the workflowItem
  cube.teamNumber = randomNumberBetween(1, gSettings().teamsNumber);
  return cube;
};
