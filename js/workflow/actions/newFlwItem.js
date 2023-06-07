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

  // Calculate the effortTotal for the flwItem
  // ...before we finish with the geometry so that
  // we can use the value to set the scale of the cube
  // in the geometry which is efficient, apparently.
  const flwItemEffortTotal = rndmBetween(
    gSttngs().flwItem.effort.min,
    gSttngs().flwItem.effort.max,
  );
  const scaleAdjustedForEffort =
    flwItemEffortTotal / gSttngs().flwItem.effort.max;
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
  const flwItem = new THREE.Mesh(geometry, material);
  flwItem.castShadow = true;
  flwItem.receiveShadow = true;
  const xCubed = gSttngs().x * scaleAdjustedForEffort * 3;
  flwItem.dVolume = Math.round(xCubed * 10000000) / 10000000;

  // Set the name to the uuid so we can delete it later
  flwItem.name = flwItem.uuid;

  // Set the age to 0
  flwItem.age = 0;

  // Set the position
  // flwItem.position.setFromMatrixPosition(
  //   gState().scnData.reticleStuff.reticle.matrix,
  // );
  flwItem.position.x = gState().startPosition.x;
  flwItem.position.y = gState().startPosition.y;
  flwItem.position.z = gState().startPosition.z;

  // Set the effort values of the flwItem
  flwItem.effortRemaining = flwItem.effortTotal = flwItemEffortTotal;

  // Set the team number of the flwItem
  flwItem.teamNumber = rndmBetween(1, gSttngs().teamsNumber);

  // Add the new flwItem to the array of all flwItems
  gState().flwItems.push(flwItem);

  // Add the new flwItem to the clickCubeGroup and the scene
  // gState().scnData.scene.add(flwItem);
  gState().clickCubeGroup.add(flwItem);

  flwItem.flwStepsIndex = 0;
  gState().flwStepTotals[flwItem.flwStepsIndex.toString()]++;
  console.log(
    `Updated flwStepTotals: ${
      gSttngs().flwSteps[flwItem.flwStepsIndex.toString()].name
    }`,
  );
};
