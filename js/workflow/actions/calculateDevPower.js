// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// calculateDevPower()
//------------------------------------------------------------------
export default () /*: number */ => {
  return (
    gSttngs().get("strtAvrgFlwTime") /
    gSttngs().get("touchSteps") /
    gSttngs().get("devUnits")
  );
};
