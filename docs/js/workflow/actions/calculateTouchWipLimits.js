// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// calculateTouchWipLimits()
//------------------------------------------------------------------
export default () /*: number */ => {
  return gSttngs()
    .get("steps")
    .reduce((_ /*: number*/, step /*: Object*/) => {
      if (step.status === "touch") {
        return _ + step.limit;
      } else {
        return _;
      }
    }, 0);
};
