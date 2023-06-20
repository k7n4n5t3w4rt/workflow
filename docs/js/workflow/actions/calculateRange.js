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
  let rqrdSpace /* number */ = gSttngs().steps[flwStpsIndex].limit;
  if (rqrdSpace === 0) {
    rqrdSpace = gState().flwMap[flwStpsIndex.toString()].length;
  }
  // Does this even make sense? GPT-4 told me to do it.
  // The idea is that the rate of increase decrteases as the
  // numbers get bigger
  let incrsFactor =
    rqrdSpace * gSttngs().rangeIncreaseRate * gSttngs().rangeDecreaseRate;

  range = gSttngs().scale * incrsFactor;
  // Don't let it go over the max range
  if (range > gSttngs().rangeMax) {
    range = gSttngs().rangeMax;
  }

  return range;
};
