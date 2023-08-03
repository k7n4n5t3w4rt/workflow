// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// calculateTotalWipLimits()
//------------------------------------------------------------------
const calculateTotalWipLimits = () /*: number | void */ => {
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
    setTimeout(calculateTotalWipLimits, 1000);
  }
};
export default calculateTotalWipLimits;
