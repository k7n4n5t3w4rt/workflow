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
import calculateTouchSteps from "./calculateTouchSteps.js";
import calculateWaitSteps from "./calculateWaitSteps.js";
import calculateValueForScale from "./calculateValueForScale.js";
import calculateZPosFromStep from "./calculateZPosFromStep.js";
import calculateFlwTimeMax from "./calculateFlwTimeMax.js";
import calculateFlwTimeAtStart from "./calculateFlwTimeAtStart.js";
import hexToHSL from "./hexToHSL.js";
import setInstanceColor from "./setInstanceColor.js";
//------------------------------------------------------------------
// FUNCTION: newFlwItem()
//------------------------------------------------------------------
export const newFlwItem = (
  stepIndex /*: number */ = 0,
) /*: CbInstance | void */ => {
  // //------------------------------------------------------------------
  // // DEBUG
  // //------------------------------------------------------------------
  // return;
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
  return flwItem;
};
export default newFlwItem;
//------------------------------------------------------------------
// threeJsCube()
//------------------------------------------------------------------
const threeJsCube = (stepIndex /*: number */) /*: CbInstance */ => {
  const instncdCbMesh = gState().get("instncdCbMesh");
  // const actvInstances = gState().get("actvInstances");
  const inctvInstances = gState().get("inctvInstances");
  const stpStatus = gSttngs().get("steps")[stepIndex].status;
  const flwItem = inctvInstances.pop();
  // actvInstances.push(flwItem);
  //------------------------------------------------------------------
  // COLOR
  //------------------------------------------------------------------
  // Gold, for touch is the default
  let colorCode = "#" + gSttngs().get("colorGold");
  if (stpStatus === "backlog") {
    colorCode = "#" + gSttngs().get("colorBlue");
  } else if (stpStatus === "wait") {
    colorCode = "#" + gSttngs().get("colorGrey");
  }
  //------------------------------------------------------------------
  // NOT WORKING
  //------------------------------------------------------------------
  // THIS IS THE "VERTICES" WAY OFSETTING HE COLOUR
  // const HSL = hexToHSL(colorCode);
  // const instanceColor = new THREE.Color();
  // instanceColor.setHSL(HSL.h, HSL.s, HSL.l); // set color using hue, saturation, lightness
  // const color = new THREE.Color().setHSL(HSL.h, HSL.s, HSL.l);
  // THIS IS THE, APPARENTLY, SIMPLER HEX VALUE WAY OF SETTING IT
  // setInstanceColor(flwItem.index, colorCode);
  // Set the color for changing it later
  flwItem.dColor = colorCode;
  return flwItem;
};
//------------------------------------------------------------------
// setDProps(flwItem)
//------------------------------------------------------------------
const setDProps = (flwItem /*: CbInstance */) /*: CbInstance */ => {
  // Set the name to the uuid so we can find it later - Three.js "needs" a name property
  flwItem.name = "cb_" + flwItem.index.toString();
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
  flwItem /*: CbInstance */,
  flwMapIndex /*: number */,
) /*: CbInstance */ => {
  // Add the new flwItem to the flwMap in the backlog
  flwItem.dStpIndex = flwMapIndex;
  gState().get("flwMap")[flwItem.dStpIndex.toString()].push(flwItem);
  return flwItem;
};
//------------------------------------------------------------------
// setScaleAndValue()
//------------------------------------------------------------------
const setScaleAndValue = (flwItem /*: CbInstance */) /*: CbInstance */ => {
  const instncdCbMesh = gState().get("instncdCbMesh");
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
  flwItem.dDysTotal = rndmBetween(daysMin, daysMax);
  const daysTotal = flwItem.dDysTotal;
  // This will be the scale and value if the flwItmSizeLimit is not set
  let scaleValue = daysTotal / daysMax;
  flwItem.dValue = scaleValue;
  // If the flwItmSizeLimit is set, use it to reduce the scale
  // and increase the relative value
  if (
    gSttngs().get("flwItmSizeLimit") >= 0.2 &&
    gSttngs().get("flwItmSizeLimit") < 1 &&
    scaleValue >= gSttngs().get("flwItmSizeLimit")
  ) {
    flwItem.dValue = calculateValueForScale(
      scaleValue,
      gSttngs().get("flwItmSizeLimit"),
    );
    flwItem.dDysTotal = gSttngs().get("flwItmSizeLimit") * daysMax;
    scaleValue = gSttngs().get("flwItmSizeLimit");
  }
  // Set the scale and store the scale value
  //------------------------------------------------------------------
  // SCALE
  //------------------------------------------------------------------
  const matrix = new THREE.Matrix4();
  const position = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();
  const scale = new THREE.Vector3();
  const newScale = new THREE.Vector3(scaleValue, scaleValue, scaleValue);
  instncdCbMesh.getMatrixAt(flwItem.index, matrix);
  // Decompose the matrix to get position, rotation, and scale
  matrix.decompose(position, quaternion, scale);
  // Store the quaternion for later use - like wen manipulating the matrix to move the cube
  flwItem.dQuaternion = quaternion;
  // Now, we'll set the new scale
  matrix.compose(position, quaternion, newScale);
  // Set the updated matrix back to the instance
  instncdCbMesh.setMatrixAt(flwItem.index, matrix);
  instncdCbMesh.instanceMatrix.needsUpdate = true;
  flwItem.dScale = scaleValue;
  return flwItem;
};
//------------------------------------------------------------------
// setVolume()
//------------------------------------------------------------------
const setVolume = (flwItem /*: CbInstance */) /*: CbInstance */ => {
  const scale = flwItem.dScale;
  flwItem.dVolume =
    gSttngs().get("x") *
    scale *
    (gSttngs().get("y") * scale) *
    (gSttngs().get("z") * scale);
  return flwItem;
};
//------------------------------------------------------------------
// setAge()
//------------------------------------------------------------------
const setAge = (
  flwItem /*: CbInstance */,
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
  if (stepIndex > 0) {
    flwItem.dAge = rndmBetween(0, calculateFlwTimeMax());
    // Bit of a hack but it will do for now
    flwItem.dStepsAges[stepIndex.toString()] = flwItem.dAge;
  }
};
//------------------------------------------------------------------
// setDays()
//------------------------------------------------------------------
const setDays = (flwItem /*: CbInstance */) /*: void */ => {
  let dStpIndex = flwItem.dStpIndex;
  if (dStpIndex > gSttngs().get("steps").length - 1) {
    dStpIndex = gSttngs().get("steps").length - 1;
    flwItem.dStpIndex = dStpIndex;
  }
  flwItem.dDysEachTouchStep = flwItem.dDysTotal / calculateTouchSteps();
  flwItem.dDysRmnngThisStep = 0;
  // This will only be the case for prepopulated items
  if (gSttngs().get("steps")[dStpIndex].status === "touch") {
    flwItem.dDysRmnngThisStep = rndmBetween(0, flwItem.dDysEachTouchStep);
  }
};
//------------------------------------------------------------------
// setPosition()
//------------------------------------------------------------------
const setPosition = (
  flwItem /*: CbInstance */,
  flwMapIndex /*: number */,
) /*: void */ => {
  const instncdCbMesh = gState().get("instncdCbMesh");
  flwItem.dPosition.x = gState().get("strtPosition").x;
  flwItem.dPosition.y = gState().get("strtPosition").y;
  flwItem.dPosition.z = calculateZPosFromStep(flwMapIndex);
  flwItem.dPosition = { ...refineNewPosition(flwItem) };
  // Set the position to the refined position
  const matrix = new THREE.Matrix4();
  instncdCbMesh.getMatrixAt(flwItem.index, matrix);

  // Setting position values from flwItem.dPosition
  const position = new THREE.Vector3(
    flwItem.dPosition.x,
    flwItem.dPosition.y,
    flwItem.dPosition.z,
  );
  matrix.setPosition(position);

  instncdCbMesh.setMatrixAt(flwItem.index, matrix);
  instncdCbMesh.instanceMatrix.needsUpdate = true;
  flwItem.dMoving = false;
};
//------------------------------------------------------------------
// refineNewPosition()
//------------------------------------------------------------------
const refineNewPosition = (
  flwItem /*: CbInstance */,
) /*: ThrMeshPosition */ => {
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
