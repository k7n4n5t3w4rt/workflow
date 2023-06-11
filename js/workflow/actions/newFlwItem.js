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
import flwItmTracker from "./flwItmTracker.js";

export default () /*: FlwItem */ => {
  // Basic properties of the cube
  const geometry = new THREE.BoxGeometry(gSttngs().x, gSttngs().y, gSttngs().z);

  // Calculate the dEffrtTotal for the flwItem
  // ...before we finish with the geometry so that
  // we can use the value to set the scale of the cube
  // in the geometry which is efficient, apparently.
  const flwItemEffortTotal = rndmBetween(
    gSttngs().flwItem.effort.min,
    gSttngs().flwItem.effort.max,
  );
  const scaleAdjustment =
    Math.round((flwItemEffortTotal / gSttngs().flwItem.effort.max) * 1000) /
    1000;

  // Make it white to start with
  const material = new THREE.MeshBasicMaterial({
    color: "#ffd700", // gold
  });

  // Create the cube
  const flwItem = new THREE.Mesh(geometry, material);
  flwItem.castShadow = true;
  flwItem.receiveShadow = true;
  flwItem.dScaleAdjustment = scaleAdjustment;
  flwItem.dDimensions = {
    x: gSttngs().x,
    y: gSttngs().y,
    z: gSttngs().z,
  };
  flwItem.scale.set(scaleAdjustment, scaleAdjustment, scaleAdjustment);
  flwItem.dVolume =
    flwItem.dDimensions.x *
    flwItem.dScaleAdjustment *
    (flwItem.dDimensions.y * flwItem.dScaleAdjustment) *
    (flwItem.dDimensions.z * flwItem.dScaleAdjustment);
  // Set the name to the uuid so we can delete it later
  flwItem.name = flwItem.uuid;
  // Set the age to 0
  flwItem.dAge = 0;
  flwItem.dColor = "#ffd700";

  // Set the position
  // flwItem.position.setFromMatrixPosition(
  //   gState().scnData.reticleStuff.reticle.matrix,
  // );
  flwItem.position.x = gState().strtPosition.x;
  flwItem.position.y = gState().strtPosition.y;
  flwItem.position.z = gState().strtPosition.z;
  flwItem.dPosition = flwItem.position.clone();
  flwItem.dMoving = false;

  // Set the effort values of the flwItem
  flwItem.dEffrtRemaining = flwItem.dEffrtTotal = flwItemEffortTotal;

  // Set the team number of the flwItem
  flwItem.dTmNumber = rndmBetween(1, gSttngs().tmsNumber);

  // Add the new flwItem to the flwMap in the first flwStep
  // (whatever that is but it will be the backlog)
  flwItem.dFlwStpsIndex = 0;
  gState().flwMap[flwItem.dFlwStpsIndex.toString()].push(flwItem);

  // Add the new flwItem to the clckCbGroup and the scene
  // gState().scnData.scene.add(flwItem);
  gState().clckCbGroup.add(flwItem);

  gState().flwItmTracker[flwItem.name] = [];
  flwItmTracker(
    flwItem.name,
    `Created, and added to step ${flwItem.dFlwStpsIndex}`,
  );
  // Not using the return value, but Flow will keep us honest
  return flwItem;
};
