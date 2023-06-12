// @flow
//------------------------------------------------------------------
// THREE.js
//------------------------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
//------------------------------------------------------------------
// GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// HELPERS
//------------------------------------------------------------------
import rndmPosOrNeg from "./rndmPosOrNeg.js";
import rndmBetween from "./rndmBetweenIntegers.js";
import flwItmTracker from "./flwItmTracker.js";

export default () /*: FlwItem */ => {
  // Create the cube
  const flwItem = threeJsCube();
  // Set the effort values of the flwItem
  setEffort(flwItem);
  // Set the scale and volume of the flwItem
  setScaleAndVolume(flwItem);
  // Set the position
  setPosition(flwItem);
  // Add the new flwItem to the clckCbGroup (and the scene)
  gState().clckCbGroup.add(flwItem);
  // e.g.: flwItmTracker( flwItem.name, `Message...`, );
  gState().flwItmTracker[flwItem.name] = [];
  // Not using the return value, but Flow will keep us honest
  return flwItem;
};

//------------------------------------------------------------------
// threeJsCube()
//------------------------------------------------------------------
const threeJsCube = () /*: FlwItem */ => {
  // Basic Three.js geometry and material
  const geometry = new THREE.BoxGeometry(gSttngs().x, gSttngs().y, gSttngs().z);
  const color = "#ffd700"; // gold
  const material = new THREE.MeshBasicMaterial({ color });
  const flwItem = new THREE.Mesh(geometry, material);
  // Set the color for changing it later
  flwItem.dColor = color;
  // Set the name to the uuid so we can find it later - Three.js "needs" a name property
  flwItem.name = flwItem.uuid;
  // Set the age to 0
  flwItem.dAge = 0;
  // Set the team number (there is only one for now)
  flwItem.dTmNumber = rndmBetween(1, gSttngs().tmsNumber);
  // Add the new flwItem to the flwMap in the backlog
  flwItem.dFlwStpsIndex = 0;
  gState().flwMap[flwItem.dFlwStpsIndex.toString()].push(flwItem);
  return flwItem;
};

//------------------------------------------------------------------
// setScaleAndVolume()
//------------------------------------------------------------------
const setScaleAndVolume = (flwItem /*: FlwItem */) /*: void */ => {
  const scaleAdjustment =
    Math.round((flwItem.dEffrtTotal / gSttngs().flwItem.effort.max) * 1000) /
    1000;

  flwItem.scale.set(scaleAdjustment, scaleAdjustment, scaleAdjustment);
  flwItem.dVolume =
    gSttngs().x *
    scaleAdjustment *
    (gSttngs().y * scaleAdjustment) *
    (gSttngs().z * scaleAdjustment);
};

//------------------------------------------------------------------
// setEffort()
//------------------------------------------------------------------
const setEffort = (flwItem /*: FlwItem */) /*: void */ => {
  flwItem.dEffrtTotal = rndmBetween(
    gSttngs().flwItem.effort.min,
    gSttngs().flwItem.effort.max,
  );
  flwItem.dEffrtRmnngCurrentStep = flwItem.dEffrtTotal / gSttngs().touchSteps;
  flwItem.dEffrtEachTouchStep = flwItem.dEffrtRmnngCurrentStep;
};

//------------------------------------------------------------------
// setPosition()
//------------------------------------------------------------------
const setPosition = (flwItem /*: FlwItem */) /*: void */ => {
  flwItem.position.x = gState().strtPosition.x;
  flwItem.position.y = gState().strtPosition.y;
  flwItem.position.z = gState().strtPosition.z;
  flwItem.dPosition = flwItem.position.clone();
  flwItem.dMoving = false;
};
