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
import addNewFlowItemsAtArrivalRate from "./addNewFlowItemsAtArrivalRate.js";
import updateNrmlWip from "./click.js_updateNrmlWip.js";
import resizeVSphere from "./resizeVSphere.js";
import updateAge from "./updateAge.js";
import updateDays from "./click.js_updateDays.js";
import updateTimeBoxMetrics from "./click.js_updateTimeBoxMetrics.js";
import updateClickMetrics from "./click.js_updateClickMetrics.js";
import removeDoneFlwItmsFromFlwMap from "./click.js_removeDoneFlwItmsFromFlwMap.js";
import recursivelyPullFlwItems from "./click.js_recursivelyPullFlwItems.js";
import move from "./move.js";
import autoMoveDevUnits from "./autoMoveDevUnits.js";
import click from "./click.js";
//------------------------------------------------------------------
// postClickActions()
//------------------------------------------------------------------
export const clickActions = () /*: void */ => {
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
      move(flwItem);
    }
    if (gSttngs().get("devUnitsMoveToWork")) {
      autoMoveDevUnits();
    }
    // NOTE: The order of these function calls is important
    addNewFlowItemsAtArrivalRate();
    // setExpedite();
    resizeVSphere();
    updateAge();
    updateDays();
    recursivelyPullFlwItems();
    // updateExpdtWip();
    updateNrmlWip();
    filterDoneItems(removeDoneFlwItmsFromFlwMap)();
    updateClickMetrics();
    if (gState().get("clicks") === 1) {
      updateTimeBoxMetrics();
    }
  }
  // if (gState().get("clicks") <= 3) {
  click();
  // }
};

export default clickActions;
