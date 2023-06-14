// @flow
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import rndmPosOrNeg from "./rndmPosOrNeg.js";
import rndmBetween from "./rndmBetweenIntegers.js";
import flwItmTracker from "./flwItmTracker.js";
import refineNewPosition from "./calculateRange.js";

export default (flwStepIndex /*: number */ = 0) /*: FlwItem */ => {
  // Create the cube
  const flwItem = threeJsCube();
  setDProps(flwItem);
  gState().flwItmTracker[flwItem.name] = [];
  mapIt(flwItem, flwStepIndex);
  setEffort(flwItem);
  setScaleAndVolume(flwItem);
  setPosition(flwItem, flwStepIndex);
  gState().clckCbGroup.add(flwItem);
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
  return flwItem;
};

//------------------------------------------------------------------
// setDProps(flwItem)
//------------------------------------------------------------------
const setDProps = (flwItem /*: FlwItem */) /*: FlwItem */ => {
  // Set the name to the uuid so we can find it later - Three.js "needs" a name property
  flwItem.name = flwItem.uuid;
  // Set the age to 0
  flwItem.dAge = 0;
  // Set the team number (there is only one for now)
  flwItem.dTmNumber = rndmBetween(1, gSttngs().tmsNumber);
  return flwItem;
};

//------------------------------------------------------------------
// mapIt(flwItem)
//------------------------------------------------------------------
const mapIt = (
  flwItem /*: FlwItem */,
  flwMapIndex /*: number */,
) /*: FlwItem */ => {
  gState().flwItmTracker[flwItem.name].unshift(
    `Being added to step ${flwMapIndex}.`,
  );
  // Add the new flwItem to the flwMap in the backlog
  flwItem.dFlwStpsIndex = flwMapIndex;
  gState().flwItmTracker[flwItem.name].unshift(
    `dFlwStpsIndex set to ${flwMapIndex}.`,
  );
  gState().flwItmTracker[flwItem.name].unshift(
    `Being added to the flwMap at step ${flwItem.dFlwStpsIndex.toString()}.`,
  );
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
  flwItem.dScale = scaleAdjustment;
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
const setPosition = (
  flwItem /*: FlwItem */,
  flwMapIndex /*: number */,
) /*: void */ => {
  // Set the position because refineNewPosition() needs it
  flwItem.position.x = gState().strtPosition.x + gSttngs().step * flwMapIndex;
  flwItem.position.y = gState().strtPosition.y + gSttngs().step * flwMapIndex;
  flwItem.position.z = gState().strtPosition.z + gSttngs().step * flwMapIndex;
  // flwItem.dPosition = { ...refineNewPosition(flwItem) };
  // // Set the position to the refined position
  // flwItem.position.x = flwItem.dPosition.x;
  // flwItem.position.y = flwItem.dPosition.y;
  // flwItem.position.z = flwItem.dPosition.z;
  flwItem.dMoving = false;
};
