// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// getFlowStepLimit()
//------------------------------------------------------------------
export default (flwMpStpKeyNumber /*: number */) /*: number */ => {
  let flwStpLimit = gSttngs().get("steps")[flwMpStpKeyNumber].limit;
  if (flwStpLimit === 0) {
    // Check if `limit` is set in the global steps settings
    if (
      // If we're not on the first or last step
      flwMpStpKeyNumber !== 0 &&
      flwMpStpKeyNumber !== gSttngs().get("steps").length - 1 &&
      // And if the global wipLimitEachStep is not 0
      gSttngs().get("wipLimitEachStep") !== 0
    ) {
      // Use the global wipLimitEachStep
      flwStpLimit = gSttngs().get("wipLimitEachStep");
    }
  }
  return flwStpLimit;
};
