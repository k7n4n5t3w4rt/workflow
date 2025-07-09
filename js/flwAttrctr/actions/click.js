// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs";
import gState from "./gState";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import filterDoneItems from "./click.js_filterDoneItems";
import updateExpdtWip from "./click.js_updateExpdtWip";
import addNewFlowItemsAtArrivalRate from "./click.js_addNewFlowItemsAtArrivalRate";
import updateNrmlWip from "./click.js_updateNrmlWip";
import setExpedite from "./click.js_setExpedite";
import resizeVSphere from "./click.js_resizeVSphere";
import animateClickCube from "./click.js_animateClickCube";
import updateAge from "./click.js_updateAge";
import updateDays from "./click.js_updateDays";
import updateTimeBoxMetrics from "./click.js_updateTimeBoxMetrics";
import updateClickMetrics from "./click.js_updateClickMetrics";
import removeDoneFlwItmsFromFlwMap from "./click.js_removeDoneFlwItmsFromFlwMap";
import recursivelyPullFlwItems from "./click.js_recursivelyPullFlwItems";
import move from "./click.js_move";
import autoMoveDevUnits from "./autoMoveDevUnits";
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
export default click;
