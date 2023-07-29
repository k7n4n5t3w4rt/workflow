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
    gSttngs().get("avrgFlwTimeAtStart") +
    (gSttngs().get("avrgFlwTimeAtStart") - gSttngs().get("flwTimeMin"))
  );
};
