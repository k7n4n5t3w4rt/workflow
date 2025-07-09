// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import calculateFlwTimeAtStart from "./calculateFlwTimeAtStart";
//------------------------------------------------------------------
// calculateFlwTimeMax()
//------------------------------------------------------------------
export const calculateFlwTimeMax = () /*: number */ => {
  const flwTimeAtStart = calculateFlwTimeAtStart();
  const flwTimeMin = gSttngs().get("flwTimeMin");
  if (flwTimeMin > flwTimeAtStart) {
    // A safety check in case the user has set flwTimeMin to a value that is
    // higher than flwTimeAtStart as it is calculated based on the flwTime
    // settings for each step.
    return flwTimeAtStart;
  } else {
    return flwTimeAtStart + (flwTimeAtStart - flwTimeMin);
  }
};
export default calculateFlwTimeMax;
