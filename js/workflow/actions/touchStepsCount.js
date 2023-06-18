// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";

//------------------------------------------------------------------
// touchStepsCount()
//------------------------------------------------------------------
export default () /*: number */ => {
  return gSttngs().flwSteps.reduce(checkIfStepIsTouch, 0);
};
//------------------------------------------------------------------
// checkIfStepIsTouch()
//------------------------------------------------------------------
const checkIfStepIsTouch = (
  _ /*: number */,
  flwStp /*: FlwStep */,
  index /*: number */,
) /*: number */ => {
  if (flwStp.status === "touch") {
    return _ + 1;
  }
  return _;
};
