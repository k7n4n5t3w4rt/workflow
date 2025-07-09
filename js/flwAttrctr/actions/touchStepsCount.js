// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs";

//------------------------------------------------------------------
// touchStepsCount()
//------------------------------------------------------------------
export default () /*: number */ => {
  return gSttngs().get("steps").reduce(checkIfStepIsTouch, 0);
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
