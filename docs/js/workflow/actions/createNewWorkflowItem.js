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
import randomNumberBetween from "./randomNumberBetweenIntegers.js";

export default () /*: void */ => {
  // Basic properties of the cube
  const geometry = new THREE.BoxGeometry(
    gSettings().x,
    gSettings().y,
    gSettings().z,
  );

  // Calculate the effortTotal for the workflowItem
  // ...before we finish with the geometry so that
  // we can use the value to set the scale of the cube
  // in the geometry which is efficient, apparently.
  const workflowItemEffortTotal = randomNumberBetween(
    gSettings().workflowItem.effort.min,
    gSettings().workflowItem.effort.max,
  );
  const scaleAdjustedForEffort =
    workflowItemEffortTotal / gSettings().workflowItem.effort.max;
  geometry.scale(
    scaleAdjustedForEffort,
    scaleAdjustedForEffort,
    scaleAdjustedForEffort,
  );

  // Make it white to start with
  const material = new THREE.MeshBasicMaterial({
    color: `rgb(255,255,255)`,
  });

  // Create the cube
  const workflowItem = new THREE.Mesh(geometry, material);
  workflowItem.castShadow = true;
  workflowItem.receiveShadow = true;
  workflowItem.volume = Math.pow(gSettings().x * scaleAdjustedForEffort, 3);

  // Set the name to the uuid so we can delete it later
  workflowItem.name = workflowItem.uuid;

  // Set the age to 0
  workflowItem.age = 0;

  // Set the position
  // workflowItem.position.setFromMatrixPosition(
  //   gState().sceneData.reticleStuff.reticle.matrix,
  // );
  workflowItem.position.x = gState().objects.startPosition.x;
  workflowItem.position.y = gState().objects.startPosition.y;
  workflowItem.position.z = gState().objects.startPosition.z;

  // Set the effort values of the workflowItem
  workflowItem.effortRemaining = workflowItem.effortTotal =
    workflowItemEffortTotal;

  // Set the workflowStepsIndex so we can pull the
  // status info from the gSettings().workflowSteps array
  workflowItem.workflowStepsIndex = 0;

  // Set the team number of the workflowItem
  workflowItem.teamNumber = randomNumberBetween(1, gSettings().teamsNumber);

  // Add the new workflowItem to the array of all workflowItems
  gState().objects.workflowItems.push(workflowItem);

  // Add the new workflowItem to the clickCubeGroup and the scene
  // gState().sceneData.scene.add(workflowItem);
  gState().objects.clickCubeGroup.add(workflowItem);
};
