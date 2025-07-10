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
//------------------------------------------------------------------
// onClickComplete()
//------------------------------------------------------------------
export const onClickComplete = () /*: void */ => {
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

//------------------------------------------------------------------
// headlessClickLoop()
//------------------------------------------------------------------
export const headlessClickLoop = () /*: void */ => {
  // Globals
  const flwItmsToMove /*: FlwItmsToMove */ = gState().get("flwItmsToMove");
  const timeBox = gSttngs().get("timeBox");
  const clicks = gState().get("clicks");
  if (gSttngs().get("devUnitsMoveToWork")) {
    autoMoveDevUnits();
  }
  // NOTE: The order of these function calls is important
  addNewFlowItemsAtArrivalRate();
  resizeVSphere();
  updateAge();
  updateDays();
  recursivelyPullFlwItems();
  updateNrmlWip();
  filterDoneItems(removeDoneFlwItmsFromFlwMap)();
  updateClickMetrics();
  if (gState().get("clicks") === 1) {
    updateTimeBoxMetrics();
  }
};

export default click;
