// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// calculateFlwTimeMax()
//------------------------------------------------------------------
export const calculateFlwTimeMax = () /*: number */ => {
  return (
    gSttngs().get("avrgFlwTimeAtStart") +
    (gSttngs().get("avrgFlwTimeAtStart") - gSttngs().get("flwTimeMin"))
  );
};
export default calculateFlwTimeMax;
