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
import removeFlowItem from "./removeFlowItem.js";
import removeDoneFlwItmsFromFlwMap from "./removeDoneFlwItmsFromFlwMap.js";
import getSttngsFromEasyStorage from "./getSttngsFromEasyStorage.js";
import addNewFlowItemsAtArrivalRate from "./addNewFlowItemsAtArrivalRate.js";
import recursivelyPullFlwItems from "./recursivelyPullFlwItems.js";
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
  // NOTE: The order of these function calls is important
  if (gState().get("paused") === false) {
    addNewFlowItemsAtArrivalRate();
    setExpedite();
    resizeVSphere();
    updateAge();
    updateDays();
    recursivelyPullFlwItems();
    updateExpdtWip();
    updateNrmlWip();
    filterDoneItems(removeDoneFlwItmsFromFlwMap)();
    // If we stop the simulation - like, because we want to replace it -
    // we want to stop the click.
  }
  click();
};
export default click;
