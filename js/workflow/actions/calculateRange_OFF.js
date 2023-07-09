// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------

//------------------------------------------------------------------
// calculateRange()
//------------------------------------------------------------------
export default (flwStpsIndex /*: number */) /*: number */ => {
  let range = 0;
  // Set the required space to the limit of the current step.
  // If the limit is 0, set the required space to thenumber of
  // wrkFlwItems in the current step.
  // let rqrdSpace /* number */ = gSttngs().get("steps")[flwStpsIndex].limit;
  let rqrdSpace /* number */ = 0;
  // if (rqrdSpace === 0) {
  // Check if `limit` is set in the global steps settings
  if (
    // If we're not on the last step
    flwStpsIndex !==
    gSttngs().get("steps").length - 1
    // And if the wip limit for this step is not 0
    // && gSttngs().get("steps")[flwStpsIndex].limit !== 0
  ) {
    //   // Use the wip limit of the current step
    //   rqrdSpace = gSttngs().get("steps")[flwStpsIndex].limit;
    // } else {
    rqrdSpace = gState().get("flwMap")[flwStpsIndex.toString()].length;
  }
  // }
  // Does this even make sense? GPT-4 told me to do it.
  // The idea is that the rate of increase decrteases as the
  // numbers get bigger
  let rangeFactor = rqrdSpace * 3 * 0.1;
  // gSttngs().get("rangeIncreaseRate") *
  // gSttngs().get("rangeMidpoint");

  range = gSttngs().get("scale") * rangeFactor;
  // Don't let it go over the height of the start position
  if (range > gState().get("strtPosition").y) {
    range = gState().get("strtPosition").y;
  }

  return Math.round(range * 100) / 100;
};
