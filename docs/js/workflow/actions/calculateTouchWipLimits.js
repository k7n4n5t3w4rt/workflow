// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// calculateTouchWipLimits()
//------------------------------------------------------------------
export const calculateTouchWipLimits = () /*: number */ => {
  const steps = gSttngs().get("steps");
  if (steps !== undefined) {
    return steps.reduce((_ /*: number*/, step /*: Object*/) => {
      if (step.status === "touch" || step.status === "wait") {
        return _ + step.limit;
      } else {
        return _;
      }
    }, 0);
  } else {
    setTimeout(calculateTouchWipLimits, 1000);
    return 0;
  }
};
export default calculateTouchWipLimits;
