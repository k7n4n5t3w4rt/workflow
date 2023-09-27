// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import filterDoneItems from "./filterDoneItems.js";
import updateExpdtWip from "./updateExpdtWip.js";
import updateNrmlWip from "./updateNrmlWip.js";
import setExpedite from "./setExpedite.js";
import resizeVSphere from "./resizeVSphere.js";
import animateClickCube from "./animateClickCube.js";
import updateAge from "./updateAge.js";
import updateDays from "./updateDays.js";
import removeDoneFlwItmsFromFlwMap from "./removeDoneFlwItmsFromFlwMap.js";
import addNewFlowItemsAtArrivalRate from "./addNewFlowItemsAtArrivalRate.js";
import recursivelyPullFlwItems from "./recursivelyPullFlwItems.js";
import move from "./move.js";
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
    if (gState().get("clicks") === gSttngs().get("timeBox")) {
    }
  }
  // if (gState().get("clicks") <= 3) {
  click();
  // }
};
export default click;
