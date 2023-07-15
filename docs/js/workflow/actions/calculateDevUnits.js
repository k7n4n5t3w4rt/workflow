// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// touchStepsCount()
//------------------------------------------------------------------
export default () /*: number */ => {
  return gSttngs()
    .get("steps")
    .reduce((_ /*: number*/, step /*: Object*/) => {
      if (step.status === "touch") {
        return _ + step.devUnits;
      } else {
        return _;
      }
    }, 0);
};
