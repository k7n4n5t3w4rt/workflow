// @flow
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

export default (stepIndex /*: number */ = 0) /*: any */ => {
  gState().set("uuid", gState().get("uuid") + 1);
  // Create the cube
  const flwItem = {
    uuid: gState().get("uuid").toString(),
    name: gState().get("uuid").toString(),
    dAge: 0,
    dColor: "",
    dDysEachTouchStep: 0,
    dDysRmnngInTotal: 0,
    dDysRmnngThisStep: 0,
    dDysTotal: 0,
    dExpedite: false,
    dMoving: false,
    dPosition: {},
    dScale: 1,
    dSkipForWip: false,
    dStepsAges: {},
    dStpIndex: 0,
    dTmNumber: 1,
    dValue: 1,
    dVolume: 1,
  };
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

//------------------------------------------------------------------
// setDProps(flwItem)
//------------------------------------------------------------------
const setDProps = (flwItem /*: any */) /*: FlwItem */ => {
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
  flwItem /*: any */,
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
const setScaleAndValue = (flwItem /*: any */) /*: FlwItem */ => {
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
  // Store the scale value
  flwItem.dScale = scale;
  return flwItem;
};
//------------------------------------------------------------------
// setVolume()
//------------------------------------------------------------------
const setVolume = (flwItem /*: any */) /*: FlwItem */ => {
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
const setAge = (flwItem /*: any */, stepIndex /*: number */) /*: void */ => {
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
const setDays = (flwItem /*: any */) /*: void */ => {
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
  flwItem /*: any */,
  flwMapIndex /*: number */,
) /*: void */ => {
  flwItem.dMoving = false;
};

//------------------------------------------------------------------
// refineNewPosition()
//------------------------------------------------------------------
const refineNewPosition = (flwItem /*: any */) /*: ThrMeshPosition */ => {
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
