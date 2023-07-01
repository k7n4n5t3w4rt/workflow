// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import getFlwMpSteps from "./getFlwMpSteps.js";
import calculateExpdtWip from "./calculateExpdtWip.js";
//------------------------------------------------------------------
// updateWIP()
//------------------------------------------------------------------
export default () /*: void */ => {
  const wipExpdt = calculateExpdtWip();
  updateWIPExpdtQueue(wipExpdt);
};
//------------------------------------------------------------------
// updateWIPExpQueue()
//------------------------------------------------------------------
const updateWIPExpdtQueue = (wipExpdt /*: number */) /*: void */ => {
  if (gState().get("wipExpdtQueue").length() >= gSttngs().get("timeBox")) {
    gState().get("wipExpdtQueue").dequeue();
  }
  gState().get("wipExpdtQueue").enqueue([wipExpdt]);
};
