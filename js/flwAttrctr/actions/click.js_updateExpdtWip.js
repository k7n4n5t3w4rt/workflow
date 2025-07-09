// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs";
import gState from "./gState";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import getFlwMpSteps from "./getFlwMpSteps";
import calculateExpdtWip from "./calculateExpdtWip";
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
  if (gState().get("wipExpQueue").length() >= gSttngs().get("timeBox")) {
    gState().get("wipExpQueue").dequeue();
  }
  gState().get("wipExpQueue").enqueue([wipExpdt]);
};
