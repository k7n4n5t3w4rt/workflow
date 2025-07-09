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
import getAllFlwItems from "./getAllFlwItems";
import calculateNrmlWip from "./calculateNrmlWip";
//------------------------------------------------------------------
// updateWIP()
//------------------------------------------------------------------
export default () /*: void */ => {
  const wip = calculateNrmlWip();
  updateWIPQueue(wip);
};
//------------------------------------------------------------------
// updateWIPQueue()
//------------------------------------------------------------------
const updateWIPQueue = (wip /*: number */) /*: void */ => {
  while (gState().get("wipQueue").length() >= gSttngs().get("timeBox")) {
    gState().get("wipQueue").dequeue();
  }
  gState().get("wipQueue").enqueue([wip]);
};
