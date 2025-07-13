// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import clickActionsHeadless from "./clickActionsHeadless.js";
//------------------------------------------------------------------
// headlessClickLoop()
//------------------------------------------------------------------

export const headlessClickLoop = (
  nmbrOfTmbxLoops /*: number */,
  flwTms /*: FlwTms */,
) /*: FlwTms */ => {
  const timeBox = gSttngs().get("timeBox");
  const clicks = gState().get("clicks");

  if (nmbrOfTmbxLoops === 0) {
    return flwTms;
  }

  // Call clickActionsHeadless timeBox number of times
  for (let i = 0; i < timeBox; i++) {
    gState().set("clicks", i + 1);
    clickActionsHeadless();
  }
  const currentFlwTime = gState().get("flwTime");
  if (currentFlwTime > 0) {
    flwTms.push(currentFlwTime);
  }
  return headlessClickLoop(--nmbrOfTmbxLoops, flwTms);
};

export default headlessClickLoop;
