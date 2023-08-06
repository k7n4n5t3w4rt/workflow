// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import calculateFlwTimeAtStart from "./calculateFlwTimeAtStart.js";
//------------------------------------------------------------------
// calculateFlwTimeMax()
//------------------------------------------------------------------
export const calculateFlwTimeMax = () /*: number */ => {
  const flwTimeAtStart = calculateFlwTimeAtStart();
  const flwTimeMin = gSttngs().get("flwTimeMin");
  return flwTimeAtStart + (flwTimeAtStart - flwTimeMin);
};
export default calculateFlwTimeMax;
