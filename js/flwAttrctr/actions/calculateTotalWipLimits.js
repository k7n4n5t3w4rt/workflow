// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs";
//------------------------------------------------------------------
// calculateTotalWipLimits()
//------------------------------------------------------------------
const calculateTotalWipLimits = () /*: number */ => {
  const steps = gSttngs().get("steps");
  if (steps !== undefined) {
    return steps.reduce((_ /*: number*/, step /*: Object*/) => {
      if (step.status === "touch" || step.status === "wait") {
        return _ + step.movingLimit;
      } else {
        return _;
      }
    }, 0);
  } else {
    setTimeout(calculateTotalWipLimits, 1000);
    return 0;
  }
};
export default calculateTotalWipLimits;
