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

export default () /*: FlwItem */ => {
  // Basic properties of the cube
  const geometry = new THREE.BoxGeometry(gSttngs().x, gSttngs().y, gSttngs().z);

  // Calculate the dEffortTotal for the flwItem
  // ...before we finish with the geometry so that
  // we can use the value to set the scale of the cube
  // in the geometry which is efficient, apparently.
  const flwItemEffortTotal = rndmBetween(
    gSttngs().flwItem.effort.min,
    gSttngs().flwItem.effort.max,
  );
  const scaleAdjustedForEffort =
    Math.round((flwItemEffortTotal / gSttngs().flwItem.effort.max) * 1000) /
    1000;

  geometry.scale(
    gSttngs().x * scaleAdjustedForEffort,
    gSttngs().y * scaleAdjustedForEffort,
    gSttngs().z * scaleAdjustedForEffort,
  );

  // Make it white to start with
  const material = new THREE.MeshBasicMaterial({
    color: `rgb(255,255,255)`,
  });

  // Create the cube
  const flwItem = new THREE.Mesh(geometry, material);
  flwItem.castShadow = true;
  flwItem.receiveShadow = true;
  flwItem.dScale = {
    x: Math.round(gSttngs().x * scaleAdjustedForEffort * 1000) / 1000,
    y: Math.round(gSttngs().y * scaleAdjustedForEffort * 1000) / 1000,
    z: Math.round(gSttngs().z * scaleAdjustedForEffort * 1000) / 1000,
  };

  const xCubed = flwItem.dScale.x * flwItem.dScale.y * flwItem.dScale.z;
  flwItem.dVolume = Math.round(xCubed * 1000) / 1000;

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
  flwItem.dPosition = flwItem.position.clone();

  // Set the effort values of the flwItem
  flwItem.dEffortRemaining = flwItem.dEffortTotal = flwItemEffortTotal;

  // Set the team number of the flwItem
  flwItem.dTeamNumber = rndmBetween(1, gSttngs().teamsNumber);

  // Add the new flwItem to the array of all flwItems
  gState().flwItems.push(flwItem);

  // Add the new flwItem to the clickCubeGroup and the scene
  // gState().scnData.scene.add(flwItem);
  gState().clickCubeGroup.add(flwItem);

  flwItem.dFlwStepsIndex = 0;
  gState().flwStepTotals[flwItem.dFlwStepsIndex.toString()]++;

  // Not using the return value, but Flow will keep us honest
  return flwItem;
};
