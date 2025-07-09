// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs";
//------------------------------------------------------------------
// calculateDevUnits()
//------------------------------------------------------------------
export const calculateDevUnits = () /*: number */ => {
  if (gSttngs().get("steps") === undefined) return 0;
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
export default calculateDevUnits;
