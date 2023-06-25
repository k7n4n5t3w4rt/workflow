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
  const wip = calculateWip(false);
  updateWIPQueue(wip);
  const wipExp = calculateWip(true);
  updateWIPExpQueue(wipExp);
};
//------------------------------------------------------------------
// calculateWip()
//------------------------------------------------------------------
const calculateWip = (expedite /*: boolean */) /*: number */ => {
  return getAllFlwItems().reduce(
    (_ /*: number */, flwItem /*: FlwItem */) /*: number */ => {
      if (
        flwItem.dExpedite === expedite &&
        (gSttngs().get("steps")[flwItem.dStpIndex].status === "touch" ||
          gSttngs().get("steps")[flwItem.dStpIndex].status === "wait")
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
  if (gState().get("wipQueue").length() >= gSttngs().get("timeBox")) {
    gState().get("wipQueue").dequeue();
  }
  gState().get("wipQueue").enqueue([wip]);
};
//------------------------------------------------------------------
// updateWIPExpQueue()
//------------------------------------------------------------------
const updateWIPExpQueue = (wipExp /*: number */) /*: void */ => {
  if (gState().get("wipExpQueue").length() >= gSttngs().get("timeBox")) {
    gState().get("wipExpQueue").dequeue();
  }
  gState().get("wipExpQueue").enqueue([wipExp]);
};
