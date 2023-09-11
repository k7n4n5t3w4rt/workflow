// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// getFlowStepLimit()
//------------------------------------------------------------------
export default (flwMpStpKeyNumber /*: number */) /*: number */ => {
  if (gSttngs().get("steps")[flwMpStpKeyNumber] === undefined) {
    return 0;
  }
  let flwStpLimit = gSttngs().get("steps")[flwMpStpKeyNumber].movingLimit;
  if (
    // If we're on the last step
    flwMpStpKeyNumber ===
    gSttngs().get("steps").length - 1
  ) {
    // Maybe a limit was set accidentally on the Done step, but it
    // should be 0
    flwStpLimit = 0;
  }
  return flwStpLimit;
};
