// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import filterDoneItems from "./click.js_filterDoneItems.js";
import updateExpdtWip from "./click.js_updateExpdtWip.js";
import addNewFlowItemsAtArrivalRate from "./click.js_addNewFlowItemsAtArrivalRate.js";
import updateNrmlWip from "./click.js_updateNrmlWip.js";
import setExpedite from "./click.js_setExpedite.js";
import resizeVSphere from "./click.js_resizeVSphere.js";
import animateClickCube from "./click.js_animateClickCube.js";
import updateAge from "./click.js_updateAge.js";
import updateDays from "./click.js_updateDays.js";
import updateTimeBoxMetrics from "./click.js_updateTimeBoxMetrics.js";
import updateClickMetrics from "./click.js_updateClickMetrics.js";
import removeDoneFlwItmsFromFlwMap from "./click.js_removeDoneFlwItmsFromFlwMap.js";
import recursivelyPullFlwItems from "./click.js_recursivelyPullFlwItems.js";
import move from "./click.js_move.js";
import autoMoveDevUnits from "./autoMoveDevUnits.js";
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
  if (gState().get("clicks") === timeBox) {
    return [150, 1];
  } else {
    return headlessClickLoop();
  }
};

export default headlessClickLoop;
