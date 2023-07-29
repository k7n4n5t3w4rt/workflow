// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// calculateTotalWipLimits()
//------------------------------------------------------------------
export default () /*: number */ => {
  return gSttngs()
    .get("steps")
    .reduce((_ /*: number*/, step /*: Object*/) => {
      if (step.status === "touch" || step.status === "wait") {
        return _ + step.limit;
      } else {
        return _;
      }
    }, 0);
};
