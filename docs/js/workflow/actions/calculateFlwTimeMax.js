// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// calculateFlwTimeMax()
//------------------------------------------------------------------
export default () /*: number */ => {
  return (
    gSttngs().get("strtAvrgFlwTime") +
    (gSttngs().get("strtAvrgFlwTime") - gSttngs().get("flwTimeMin"))
  );
};
