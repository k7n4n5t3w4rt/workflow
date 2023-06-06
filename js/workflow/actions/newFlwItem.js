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
import rndmPosOrNeg from "./rndmPosOrNeg.js";
import rndmBetween from "./rndmBetweenIntegers.js";

export default () /*: void */ => {
  // Basic properties of the cube
  const geometry = new THREE.BoxGeometry(gSttngs().x, gSttngs().y, gSttngs().z);

  // Calculate the effortTotal for the wrkflwItem
  // ...before we finish with the geometry so that
  // we can use the value to set the scale of the cube
  // in the geometry which is efficient, apparently.
  const wrkflwItemEffortTotal = rndmBetween(
    gSttngs().wrkflwItem.effort.min,
    gSttngs().wrkflwItem.effort.max,
  );
  const scaleAdjustedForEffort =
    wrkflwItemEffortTotal / gSttngs().wrkflwItem.effort.max;
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
  const wrkflwItem = new THREE.Mesh(geometry, material);
  wrkflwItem.castShadow = true;
  wrkflwItem.receiveShadow = true;
  wrkflwItem.volume = Math.pow(gSttngs().x * scaleAdjustedForEffort, 3);

  // Set the name to the uuid so we can delete it later
  wrkflwItem.name = wrkflwItem.uuid;

  // Set the age to 0
  wrkflwItem.age = 0;

  // Set the position
  // wrkflwItem.position.setFromMatrixPosition(
  //   gState().sceneData.reticleStuff.reticle.matrix,
  // );
  wrkflwItem.position.x = gState().startPosition.x;
  wrkflwItem.position.y = gState().startPosition.y;
  wrkflwItem.position.z = gState().startPosition.z;

  // Set the effort values of the wrkflwItem
  wrkflwItem.effortRemaining = wrkflwItem.effortTotal = wrkflwItemEffortTotal;

  // Set the wrkflwStepsIndex so we can pull the
  // status info from the gSttngs().wrkflwSteps array
  wrkflwItem.wrkflwStepsIndex = 0;

  // Set the team number of the wrkflwItem
  wrkflwItem.teamNumber = rndmBetween(1, gSttngs().teamsNumber);

  // Add the new wrkflwItem to the array of all wrkflwItems
  gState().wrkflwItems.push(wrkflwItem);

  // Add the new wrkflwItem to the clickCubeGroup and the scene
  // gState().sceneData.scene.add(wrkflwItem);
  gState().clickCubeGroup.add(wrkflwItem);
};
