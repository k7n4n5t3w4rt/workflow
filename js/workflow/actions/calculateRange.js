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
  let rqrdSpace /* number */ = gSttngs().get("steps")[flwStpsIndex].limit;
  if (rqrdSpace === 0) {
    // Check if `limit` is set in the global steps settings
    if (
      // If we're not on the first or last step
      flwStpsIndex !== 0 &&
      flwStpsIndex !== gSttngs().get("steps").length - 1 &&
      // And if the wip limit for this step is not 0
      gSttngs().get("steps")[flwStpsIndex].limit !== 0
    ) {
      // Use the wip limit of the current step
      rqrdSpace = gSttngs().get("steps")[flwStpsIndex].limit;
    } else {
      // Last option is to set it to the number of flwItems in the step
      rqrdSpace = gState().get("flwMap")[flwStpsIndex.toString()].length;
    }
  }
  // Does this even make sense? GPT-4 told me to do it.
  // The idea is that the rate of increase decrteases as the
  // numbers get bigger
  let incrsFactor =
    rqrdSpace *
    gSttngs().get("rangeIncreaseRate") *
    gSttngs().get("rangeDecreaseRate");

  range = gSttngs().get("scale") * incrsFactor;
  // Don't let it go over the max range
  if (range > gSttngs().get("rangeMax")) {
    range = gSttngs().get("rangeMax");
  }

  return Math.round(range * 100) / 100;
};
