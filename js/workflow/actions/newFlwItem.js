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
import touchStepsCount from "./touchStepsCount.js";

export default (stepIndex /*: number */ = 0) /*: FlwItem */ => {
  // Create the cube
  const flwItem = threeJsCube();
  setDProps(flwItem);
  mapIt(flwItem, stepIndex);
  setColor(flwItem);
  setAge(flwItem, stepIndex);
  gState().flwItmTracker[flwItem.name] = [];
  setDays(flwItem);
  setScaleAndVolume(flwItem);
  setPosition(flwItem, stepIndex);
  gState().clckCbGroup.add(flwItem);
  return flwItem;
};

//------------------------------------------------------------------
// threeJsCube()
//------------------------------------------------------------------
const threeJsCube = () /*: FlwItem */ => {
  // Basic Three.js geometry and material
  const geometry = new THREE.BoxGeometry(gSttngs().x, gSttngs().y, gSttngs().z);
  const color = gSttngs().colorGold; // gold
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
  // Expedite is false by default
  flwItem.dExpedite = false;
  return flwItem;
};

//------------------------------------------------------------------
// setColor(flwItem)
//------------------------------------------------------------------
const setColor = (flwItem /*: FlwItem */) /*: FlwItem */ => {
  const stpStatus = gSttngs().steps[flwItem.dStpIndex].status;
  // If this flwItem is in the backlog, don't update it
  if (stpStatus !== "touch") {
    let color = new THREE.Color(gSttngs().colorGrey);
    flwItem.material.color.copy(color);
    flwItem.material.needsUpdate = true;
  }
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
  flwItem.dStpIndex = flwMapIndex;
  gState().flwMap[flwItem.dStpIndex.toString()].push(flwItem);
  return flwItem;
};

//------------------------------------------------------------------
// setScaleAndVolume()
//------------------------------------------------------------------
const setScaleAndVolume = (flwItem /*: FlwItem */) /*: FlwItem */ => {
  // Some shorthand
  const daysMax = gSttngs().flwItmSize.max;
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
const setAge = (
  flwItem /*: FlwItem */,
  stepIndex /*: number */,
) /*: void */ => {
  // Set the ages to 0 by default
  flwItem.dAge = 0;
  flwItem.dBacklogAge = 0;
  // If this is not the first step we assume that it has some age.
  if (stepIndex > 0 && gSttngs().death > 0) {
    flwItem.dAge = rndmBetween(0, gSttngs().death);
  }
};
//------------------------------------------------------------------
// setDays()
//------------------------------------------------------------------
const setDays = (flwItem /*: FlwItem */) /*: void */ => {
  flwItem.dDysTotal = rndmBetween(
    gSttngs().flwItmSize.min,
    gSttngs().flwItmSize.max,
  );
  flwItem.dDysRmnngThisStep = flwItem.dDysTotal / touchStepsCount();
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
  flwItem.position.z = gState().strtPosition.z - gSttngs().step * flwMapIndex;
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
  const range = calculateRange(flwItem.dStpIndex);
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
