// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import newFlwItem from "./newFlwItem.js";
import filterDoneItems from "./filterDoneItems.js";
import updateExpdtWip from "./updateExpdtWip.js";
import updateNrmlWip from "./updateNrmlWip.js";
import setExpedite from "./setExpedite.js";
import pullFlwItems from "./pullFlwItems.js";
import resizeVSphere from "./resizeVSphere.js";
import animateClickCube from "./animateClickCube.js";
import updateAge from "./updateAge.js";
import updateDays from "./updateDays.js";
import removeFlowItem from "./removeFlowItem.js";
import removeDoneFlwItmsFromFlwMap from "./removeDoneFlwItmsFromFlwMap.js";
import getSttngsFromEasyStorage from "./getSttngsFromEasyStorage.js";

const click = () /*: void */ => {
  gState().set("clicks"), gState().get("clicks") + 1;
  animateClickCube();
};
//------------------------------------------------------------------
// onClickComplete()
//------------------------------------------------------------------
export const onClickComplete = () /*: void */ => {
  // NOTE: The order of these function calls is important
  addNewFlowItemsAtArrivalRate();
  setExpedite();
  resizeVSphere();
  // Skip the first time through
  if (gState().get("clicks") !== 1) {
    updateAge();
    updateDays();
  }
  // pullFlwItems() calls itself recursively until there are no more
  // items left to pull.
  gState().set("flwItmsPulledCount", 0);
  pullFlwItems();
  // Update the WIPs when everything has been pulled but not yet worked on
  updateExpdtWip();
  updateNrmlWip();
  // For testing, we need to pass in removeDoneFlwItmsFromFlwMap
  filterDoneItems(removeDoneFlwItmsFromFlwMap)();
  click();
};
//------------------------------------------------------------------
// addNewFlowItemsAtArrivalRate()
//------------------------------------------------------------------
const addNewFlowItemsAtArrivalRate = () /*: void */ => {
  if (
    gState().get("flwMap")["0"].length < gSttngs().get("steps")["0"].limit ||
    gSttngs().get("steps")["0"].limit === 0
  ) {
    for (let i = 1; i <= gSttngs().get("arrivalNumber"); i++) {
      newFlwItem();
    }
  }
};
export default click;
