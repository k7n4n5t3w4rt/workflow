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

//------------------------------------------------------------------
// updateWIP()
//------------------------------------------------------------------
export default () /*: void */ => {
  const wip = calculateWip();
  updateWIPQueue(wip);
};

//------------------------------------------------------------------
// calculateWip()
//------------------------------------------------------------------
const calculateWip = () /*: number */ => {
  let wip = 0;
  // For each flwStep in the flwMap...
  getFlwMpSteps().forEach((flwMpStpItems /*: FlwItem[] */) /*: Object */ => {
    // For each flwItem in this step...
    wip += flwMpStpItems.filter((flwItem /*: FlwItem */) /*: boolean */ => {
      if (gSttngs().flwSteps[flwItem.dFlwStpsIndex].status === "touch") {
        return true;
      } else {
        return false;
      }
    }).length;
  });
  return wip;
};

//------------------------------------------------------------------
// updateWIPQueue()
//------------------------------------------------------------------
const updateWIPQueue = (wip /*: number */) /*: void */ => {
  if (gState().wipQueue.length() >= gSttngs().timeBox) {
    gState().wipQueue.dequeue();
  }
  gState().wipQueue.enqueue(wip);
};
