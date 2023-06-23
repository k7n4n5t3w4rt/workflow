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
import updateWip from "./updateWip.js";
import setExpedite from "./setExpedite.js";
import pullFlwItems from "./pullFlwItems.js";
import resizeVSphere from "./resizeVSphere.js";
import animateClickCube from "./animateClickCube.js";
import updateAge from "./updateAge.js";
import updateDays from "./updateDays.js";
import removeFlowItem from "./removeFlowItem.js";
import removeDoneFlwItmsFromFlwMap from "./removeDoneFlwItmsFromFlwMap.js";

const click = () /*: void */ => {
  gState().clicks++;
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
  if (gState().clicks !== 1) {
    updateAge();
    updateDays();
  }
  // pullFlwItems() calls itself recursively until there are no more
  // items left to pull.
  gState().flwItmsPulledCount = 0;
  pullFlwItems();
  // Update the WIP when everything has been pulled but not yet worked on
  updateWip();
  // For testing, we need to pass in removeDoneFlwItmsFromFlwMap
  filterDoneItems(removeDoneFlwItmsFromFlwMap)();
  click();
};
//------------------------------------------------------------------
// addNewFlowItemsAtArrivalRate()
//------------------------------------------------------------------
const addNewFlowItemsAtArrivalRate = () /*: void */ => {
  if (gState().flwMap["0"].length < gSttngs().backlogMax) {
    for (let i = 1; i <= gSttngs().arrivalRate; i++) {
      newFlwItem();
    }
  }
};

export default click;
