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

//------------------------------------------------------------------
// updateWIP()
//------------------------------------------------------------------
export default () /*: void */ => {
  const wip = calculateWip();
  console.log("WIP: " + wip);
  updateWIPQueue(wip);
};

//------------------------------------------------------------------
// calculateWip()
//------------------------------------------------------------------
const calculateWip = () /*: number */ => {
  return getAllFlwItems().reduce(
    (_ /*: number */, flwItem /*: FlwItem */) /*: number */ => {
      if (
        gSttngs().steps[flwItem.dStpIndex].status === "touch" ||
        gSttngs().steps[flwItem.dStpIndex].status === "wait"
      ) {
        return ++_;
      } else {
        return _;
      }
    },
    0,
  );
};

//------------------------------------------------------------------
// updateWIPQueue()
//------------------------------------------------------------------
const updateWIPQueue = (wip /*: number */) /*: void */ => {
  if (gState().wipQueue.length() >= gSttngs().timeBox) {
    gState().wipQueue.dequeue();
  }
  gState().wipQueue.enqueue([wip]);
};
