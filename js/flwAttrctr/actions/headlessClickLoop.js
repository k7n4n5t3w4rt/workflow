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
  tmbxLoopsRemaining /*: number */,
  devPowerFixLocal /*: number */,
  flwTms /*: FlwTms */,
) /*: FlwTms */ => {
  const timeBox = gSttngs().get("timeBox");
  const clicks = gState().get("clicks");

  // Set the devPowerFix in gSttngs to the local value
  // for this set of loops
  gSttngs().set("devPowerFix", devPowerFixLocal);

  if (tmbxLoopsRemaining === 0) {
    return flwTms;
  }

  // Call clickActionsHeadless timeBox number of times
  for (let i = 0; i < timeBox; i++) {
    gState().set("clicks", i + 1);
    // console.log(`headlessClickLoop(): Click number ${i + 1} of ${timeBox}.`);
    // console.log(`headlessClickLoop(): Calling clickActionsHeadless().`);
    clickActionsHeadless();
  }

  const currentFlwTime = gState().get("flwTime");

  // console.log(
  //   "[headlessClickLoop] tmbxLoopsRemaining:",
  //   tmbxLoopsRemaining,
  //   "currentFlwTime:",
  //   currentFlwTime,
  // );
  // if (currentFlwTime > 0) {
  flwTms.push(currentFlwTime);
  // }
  return headlessClickLoop(--tmbxLoopsRemaining, devPowerFixLocal, flwTms);
};

export default headlessClickLoop;
