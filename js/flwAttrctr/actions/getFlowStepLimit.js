// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs";
//------------------------------------------------------------------
// getFlowStepLimit()
//------------------------------------------------------------------
export const getFlowStepLimit = (
  flwMpStpKeyNumber /*: number */,
) /*: number */ => {
  const steps = gSttngs().get("steps");
  if (
    // If we're on the last step
    flwMpStpKeyNumber >= steps.length
  ) {
    console.error("The Flow Map and the Steps are out of sync.");
  }
  let flwStpLimit = steps[flwMpStpKeyNumber].movingLimit;
  if (
    // If we're on the last step
    flwMpStpKeyNumber ===
    steps.length - 1
  ) {
    // Maybe a limit was set accidentally on the Done step, but it
    // should be 0
    flwStpLimit = 0;
  }
  return flwStpLimit;
};
export default getFlowStepLimit;
