// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import postClickActionsHeadless from './postClickActionsHeadless.js';
//------------------------------------------------------------------
// headlessClickLoop()
//------------------------------------------------------------------
export const headlessClickLoop = () /*: Array<number> | void */ => {
  const timeBox = gSttngs().get("timeBox");
  // Placeholder for the actual return values. 150 represents the
  // average flow time over 1000 loops through the timebojjx of clicks,
  // 1 represents the devPowerFix used for the loops.

  const clicks = gState().get("clicks");

  // First time through, gState().get("clicks") will be 0, as set in
  // globalState.js
  if (clicks < timeBox) {
    gState().set("clicks", gState().get("clicks") + 1);
  } else {
    gState().set("clicks", 1);
  }
  postClickActionsHeadless();
  if (gState().get("clicks") === timeBox) {
    return [150, 1];
  } else {
    return headlessClickLoop();
  }
};

export default headlessClickLoop;
