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
import move from "./move.js";
import autoMoveDevUnits from "./autoMoveDevUnits.js";
//------------------------------------------------------------------
// FUNCTION: click()
//------------------------------------------------------------------
export const click = () /*: void */ => {
  // First time through, gState().get("clicks") will be 0, as set in
  // globalState.js
  if (gState().get("clicks") < gSttngs().get("timeBox")) {
    gState().set("clicks", gState().get("clicks") + 1);
  } else {
    gState().set("clicks", 1);
  }
  animateClickCube();
};


export default click;
