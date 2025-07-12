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
import addNewFlowItemsAtArrivalRate from "./click.js_addNewFlowItemsAtArrivalRate.js";
import updateNrmlWip from "./click.js_updateNrmlWip.js";
import resizeVSphereHeadless from "./resizeVSphereHeadless.js";
import updateAgeHeadless from "./updateAgeHeadless.js";
import updateDays from "./click.js_updateDays.js";
import updateTimeBoxMetricsHeadless from "./updateTimeBoxMetricsHeadless.js";
import updateClickMetrics from "./click.js_updateClickMetrics.js";
import removeDoneFlwItmsFromFlwMap from "./click.js_removeDoneFlwItmsFromFlwMap.js";
import recursivelyPullFlwItemsHeadless from "./recursivelyPullFlwItemsHeadless.js";
import moveHeadless from "./moveHeadless.js";
import autoMoveDevUnits from "./autoMoveDevUnits.js";
import click from "./click.js";
//------------------------------------------------------------------
// postClickActionsHeadless()
//------------------------------------------------------------------
export const postClickActionsHeadless = () /*: void */ => {
  // Globals
  const flwItmsToMove /*: FlwItmsToMove */ = gState().get("flwItmsToMove");
  const timeBox = gSttngs().get("timeBox");
  const clicks = gState().get("clicks");
  if (gState().get("paused") === false) {
    // Do all the moving
    const keys = Object.keys(flwItmsToMove);
    for (let i = 0; i < keys.length; ++i) {
      const flwItem = flwItmsToMove[keys[i]];
      delete flwItmsToMove[keys[i]];
      moveHeadless(flwItem);
    }
    if (gSttngs().get("devUnitsMoveToWork")) {
      autoMoveDevUnits();
    }
    // NOTE: The order of these function calls is important
    addNewFlowItemsAtArrivalRate();
    // setExpedite();
    resizeVSphereHeadless();
    updateAgeHeadless();
    updateDays();
    recursivelyPullFlwItemsHeadless();
    // updateExpdtWip();
    updateNrmlWip();
    filterDoneItems(removeDoneFlwItmsFromFlwMap)();
    updateClickMetrics();
    if (gState().get("clicks") === 1) {
      updateTimeBoxMetricsHeadless();
    }
  }
  
};

export default postClickActionsHeadless;
