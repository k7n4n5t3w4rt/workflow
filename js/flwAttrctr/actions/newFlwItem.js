// @flow
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
import * as THREE from "three";
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
import calculateTouchSteps from "./calculateTouchSteps.js";
import calculateWaitSteps from "./calculateWaitSteps.js";
import calculateValueForScale from "./calculateValueForScale.js";
import calculateZPosFromStep from "./calculateZPosFromStep.js";
import calculateFlwTimeMax from "./calculateFlwTimeMax.js";
import calculateFlwTimeAtStart from "./calculateFlwTimeAtStart.js";

export default (stepIndex /*: number */ = 0) /*: FlwItem */ => {
  // Create the cube
  const flwItem = threeJsCube(stepIndex);
  setDProps(flwItem);
  mapIt(flwItem, stepIndex);
  setAge(flwItem, stepIndex);
  gState().get("flwItmTracker")[flwItem.name] = [];
  setScaleAndValue(flwItem);
  setVolume(flwItem);
  setDays(flwItem);
  setPosition(flwItem, stepIndex);
  gState().get("clckCbGroup").add(flwItem);
  return flwItem;
};

//------------------------------------------------------------------
// threeJsCube()
//------------------------------------------------------------------
const threeJsCube = (stepIndex /*: number */) /*: FlwItem */ => {
  // Basic Three.js geometry and material
  const geometry = new THREE.BoxGeometry(
    gSttngs().get("x"),
    gSttngs().get("y"),
    gSttngs().get("z"),
  );
  const stpStatus = gSttngs().get("steps")[stepIndex].status;
  // Gold, for touch is the default
  let colorCode;
  if (stpStatus === "backlog") {
    colorCode = "#" + gSttngs().get("colorBlue");
  } else if (stpStatus === "wait") {
    colorCode = "#" + gSttngs().get("colorGrey");
  } else if (stpStatus === "touch") {
    colorCode = "#" + gSttngs().get("colorGold");
  }
  const material = new THREE.MeshLambertMaterial({ color: colorCode });
  const flwItem = new THREE.Mesh(geometry, material);
  flwItem.receiveShadow = true;
  flwItem.castShadow = true;
  // Set the color for changing it later
  flwItem.dColor = colorCode;
  return flwItem;
};

//------------------------------------------------------------------
// setDProps(flwItem)
//------------------------------------------------------------------
const setDProps = (flwItem /*: FlwItem */) /*: FlwItem */ => {
  // Set the name to the uuid so we can find it later - Three.js "needs" a name property
  flwItem.name = flwItem.uuid;
  // Set the team number (there is only one for now)
  flwItem.dTmNumber = rndmBetween(1, 1);
  // Expedite is false by default
  flwItem.dExpedite = false;
  // Skip is false by default
  flwItem.dSkipForWip = false;
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
  gState().get("flwMap")[flwItem.dStpIndex.toString()].push(flwItem);
  return flwItem;
};

//------------------------------------------------------------------
// setScaleAndValue()
//------------------------------------------------------------------
const setScaleAndValue = (flwItem /*: FlwItem */) /*: FlwItem */ => {
  const flwTimeAtStart = calculateFlwTimeAtStart();
  const daysMax = calculateFlwTimeMax();
  let daysMin = gSttngs().get("flwTimeMin");
  if (daysMin > flwTimeAtStart) {
    // A safety check in case the user has set flwTimeMin to a value that is
    // higher than flwTimeAtStart as it is calculated based on the flwTime
    // settings for each step.
    // NOTE: In this case, daysMax will also be flwTimeAtStart
    daysMin = flwTimeAtStart;
  }
  // The total days for a flow item is a random number between the min and max
  flwItem.dDysTotal = rndmBetween(daysMin, daysMax);
  const daysTotal = flwItem.dDysTotal;
  // The scale of the cube is proportional to the total days
  let scale = daysTotal / daysMax;
  // The value of the flow item is also proportional to the total days
  flwItem.dValue = scale;
  // If the flwItmSizeLimit is set, it means we are using the Pareto principle
  // to get a disproportionate amount of value for the size of the flow item.
  if (
    gSttngs().get("flwItmSizeLimit") >= 0.2 &&
    gSttngs().get("flwItmSizeLimit") < 1 &&
    scale >= gSttngs().get("flwItmSizeLimit")
  ) {
    // The value is calculated based on the original scale, before it is reduced
    flwItem.dValue = calculateValueForScale(
      scale,
      gSttngs().get("flwItmSizeLimit"),
    );
    // The total days is reduced to the size limit
    flwItem.dDysTotal = gSttngs().get("flwItmSizeLimit") * daysMax;
    // The scale is also reduced to the size limit
    scale = gSttngs().get("flwItmSizeLimit");
  }
  // Set the scale and store the scale value
  flwItem.scale.set(scale, scale, scale);
  flwItem.dScale = scale;
  return flwItem;
};
//------------------------------------------------------------------
// setVolume()
//------------------------------------------------------------------
const setVolume = (flwItem /*: FlwItem */) /*: FlwItem */ => {
  const scale = flwItem.dScale;
  flwItem.dVolume =
    gSttngs().get("x") *
    scale *
    (gSttngs().get("y") * scale) *
    (gSttngs().get("z") * scale);
  // Account for a 0 value edge case
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
  // Set the dStepsAges object
  flwItem.dStepsAges = {};
  gSttngs()
    .get("steps")
    .forEach((step, index) => {
      flwItem.dStepsAges[index.toString()] = 0;
    });
  // If this is not the first step we assume that it has some age.
  flwItem.dAge = stepIndex;
  let dStpIndex = flwItem.dStpIndex;
  if (stepIndex > 0) {
    // flwItem.dAge = rndmBetween(0, calculateFlwTimeMax());
    // flwItem.dAge = 0;
    flwItem.dAge = rndmBetween(
      Math.min(0.1, gSttngs().get("steps")[dStpIndex].actualFlwTime), // Minimum positive value
      gSttngs().get("steps")[dStpIndex].actualFlwTime,
    );
    // Bit of a hack but it will do for now
    flwItem.dStepsAges[stepIndex.toString()] = flwItem.dAge;
  }
};
//------------------------------------------------------------------
// setDays()
//------------------------------------------------------------------
const setDays = (flwItem /*: FlwItem */) /*: void */ => {
  let dStpIndex = flwItem.dStpIndex;
  if (dStpIndex > gSttngs().get("steps").length - 1) {
    dStpIndex = gSttngs().get("steps").length - 1;
    flwItem.dStpIndex = dStpIndex;
  }
  flwItem.dDysEachTouchStep = flwItem.dDysTotal / calculateTouchSteps();
  flwItem.dDysRmnngThisStep = 0;
  // This will only be the case for prepopulated items that are in the touch step. Real new items will only be created in the Backlog step.
  if (gSttngs().get("steps")[dStpIndex].status === "touch") {
    flwItem.dDysRmnngThisStep = rndmBetween(
      Math.min(0.1, gSttngs().get("steps")[dStpIndex].actualFlwTime), // Minimum positive value
      gSttngs().get("steps")[dStpIndex].actualFlwTime,
    );
  }
};

//------------------------------------------------------------------
// setPosition()
//------------------------------------------------------------------
const setPosition = (
  flwItem /*: FlwItem */,
  flwMapIndex /*: number */,
) /*: void */ => {
  flwItem.position.x = gState().get("strtPosition").x;
  flwItem.position.y = gState().get("strtPosition").y;
  flwItem.position.z = calculateZPosFromStep(flwMapIndex);
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
  let dStpIndex = flwItem.dStpIndex;
  if (dStpIndex > gSttngs().get("steps").length - 1) {
    dStpIndex = gSttngs().get("steps").length - 1;
    flwItem.dStpIndex = dStpIndex;
  }
  const range = calculateRange(dStpIndex);
  const newPosition = { ...flwItem.dPosition };

  newPosition.x =
    gState().get("strtPosition").x +
    (Math.round(rndmPosOrNeg() * rndmBetween(0, range) * 100) / 100) *
      rndmPosOrNeg();
  newPosition.y =
    gState().get("strtPosition").y +
    (Math.round(rndmBetween(0, range) * 100) / 100) * rndmPosOrNeg();
  return newPosition;
};
