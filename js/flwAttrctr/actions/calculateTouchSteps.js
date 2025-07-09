// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs";
//------------------------------------------------------------------
// touchStepsCount()
//------------------------------------------------------------------
export default () /*: number */ => {
  return gSttngs()
    .get("steps")
    .reduce((_ /*: number*/, step /*: Object*/) => {
      if (step.status === "touch") {
        return _ + 1;
      } else {
        return _;
      }
    }, 0);
};
