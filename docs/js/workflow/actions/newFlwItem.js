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
import rndmBetween from "./rndmBetweenWhatever.js";
import flwItmTracker from "./flwItmTracker.js";
import calculateRange from "./calculateRange.js";

export default (flwStepIndex /*: number */ = 0) /*: FlwItem */ => {
  // Create the cube
  const flwItem = threeJsCube();
  setDProps(flwItem);
  setAge(flwItem);
  gState().flwItmTracker[flwItem.name] = [];
  mapIt(flwItem, flwStepIndex);
  setDays(flwItem);
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
  // Set the team number (there is only one for now)
  flwItem.dTmNumber = rndmBetween(1, gSttngs().devUnits);
  return flwItem;
};

//------------------------------------------------------------------
// mapIt(flwItem)
//------------------------------------------------------------------
const mapIt = (
  flwItem /*: FlwItem */,
  flwMapIndex /*: number */,
) /*: FlwItem */ => {
  // Add the new flwItem to the flwMap in the backlog
  flwItem.dFlwStpsIndex = flwMapIndex;
  gState().flwMap[flwItem.dFlwStpsIndex.toString()].push(flwItem);
  return flwItem;
};

//------------------------------------------------------------------
// setScaleAndVolume()
//------------------------------------------------------------------
const setScaleAndVolume = (flwItem /*: FlwItem */) /*: FlwItem */ => {
  // Some shorthand
  const daysMax = gSttngs().flwItem.days.max;
  const daysTotal = flwItem.dDysTotal;

  const scale = Math.round((daysTotal / daysMax) * 1000) / 1000;

  flwItem.scale.set(scale, scale, scale);
  flwItem.dScale = scale;
  flwItem.dVolume =
    gSttngs().x * scale * (gSttngs().y * scale) * (gSttngs().z * scale);
  return flwItem;
};

//------------------------------------------------------------------
// setAge()
//------------------------------------------------------------------
const setAge = (flwItem /*: FlwItem */) /*: void */ => {
  // Some shorthand
  const death = gSttngs().death;
  // Set the age
  flwItem.dAge = 0;
  if (death > 0) {
    flwItem.dAge = rndmBetween(0, death);
  }
};
//------------------------------------------------------------------
// setDays()
//------------------------------------------------------------------
const setDays = (flwItem /*: FlwItem */) /*: void */ => {
  flwItem.dDysTotal = rndmBetween(
    gSttngs().flwItem.days.min,
    gSttngs().flwItem.days.max,
  );
  flwItem.dDysRmnngThisStep = flwItem.dDysTotal / gSttngs().touchSteps;
  flwItem.dDysEachTouchStep = flwItem.dDysRmnngThisStep;
};

//------------------------------------------------------------------
// setPosition()
//------------------------------------------------------------------
const setPosition = (
  flwItem /*: FlwItem */,
  flwMapIndex /*: number */,
) /*: void */ => {
  flwItem.position.x = gState().strtPosition.x;
  flwItem.position.y = gState().strtPosition.y;
  flwItem.position.z = gState().strtPosition.z + gSttngs().step * flwMapIndex;
  // Set the dPosition because refineNewPosition() needs it
  flwItem.dPosition = { ...flwItem.position };
  flwItem.dPosition = { ...refineNewPosition(flwItem) };
  // Set the position to the refined position
  flwItem.position.x = flwItem.dPosition.x;
  flwItem.position.y = flwItem.dPosition.y;
  flwItem.position.z = flwItem.dPosition.z;
  flwItem.dMoving = false;
};

//------------------------------------------------------------------
// refineNewPosition()
//------------------------------------------------------------------
const refineNewPosition = (flwItem /*: FlwItem */) /*: ThrMeshPosition */ => {
  const range = calculateRange(flwItem.dFlwStpsIndex);
  const newPosition = { ...flwItem.dPosition };

  newPosition.x =
    gState().strtPosition.x +
    (Math.round(rndmPosOrNeg() * rndmBetween(0, range) * 100) / 100) *
      rndmPosOrNeg();
  newPosition.y =
    gState().strtPosition.y +
    (Math.round(rndmBetween(0, range) * 100) / 100) * rndmPosOrNeg();
  newPosition.z -= gSttngs().step;
  return newPosition;
};
