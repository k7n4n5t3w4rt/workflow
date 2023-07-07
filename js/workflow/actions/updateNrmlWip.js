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
import getAllFlwItems from "./getAllFlwItems.js";
import calculateNrmlWip from "./calculateNrmlWip.js";
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
