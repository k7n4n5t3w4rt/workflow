// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import touchStepsCount from "./touchStepsCount.js";
import calculateDevUnits from "./calculateDevUnits.js";
//------------------------------------------------------------------
// calculateDevPower()
//------------------------------------------------------------------
export default () /*: number */ => {
  return (
    gSttngs().get("strtAvrgFlwTime") / touchStepsCount() / calculateDevUnits()
  );
};
