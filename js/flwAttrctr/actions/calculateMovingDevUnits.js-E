// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// calculateMovingDevUnits()
//------------------------------------------------------------------
export const calculateMovingDevUnits = () /*: number */ => {
  if (gSttngs().get("steps") === undefined) return 0;
  return gSttngs()
    .get("steps")
    .reduce((_ /*: number*/, step /*: Object*/) => {
      if (step.status === "touch") {
        return _ + step.movingDevUnits;
      } else {
        return _;
      }
    }, 0);
};
export default calculateMovingDevUnits;
