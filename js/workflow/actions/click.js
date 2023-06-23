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
import updateAgeAndDaysForAllItems from "./updateAgeAndDaysForAllItems.js";
import removeFlowItem from "./removeFlowItem.js";
import removeDoneFlwItmsFromFlwMap from "./removeDoneFlwItmsFromFlwMap.js";

const click = () /*: void */ => {
  // if (gState().clicks % gSttngs().timeBox === 0) {
  // }
  console.log("//------------------------------------------");
  console.log("// CLICK");
  console.log("//------------------------------------------");
  gState().clicks++;
  animateClickCube();
};

//------------------------------------------------------------------
// onClickComplete()
//------------------------------------------------------------------
export const onClickComplete = () /*: void */ => {
  for (let i = 1; i <= gSttngs().arrivalRate; i++) {
    newFlwItem();
  }
  setExpedite();
  resizeVSphere();
  // Skip the first time through
  if (gState().clicks !== 1) {
    updateAgeAndDaysForAllItems();
  }
  // If this is remains zero then nothing was pulled and we can
  // exit the loop
  gState().flwItmsPulledCount = 0;
  pullFlwItems();
  // Update the WIP when everything has been pulled but not yet
  // worked on
  updateWip();
  // For testing, we need to pass in removeFlowItem
  filterDoneItems(removeDoneFlwItmsFromFlwMap)();
  //if (gState().clicks % (gSttngs().timeBox * 2) !== 0) {
  // Start the click cycle over again
  click();
  // } else {
  //   console.log("CLICKS END: " + gState().clicks);
  // }
};
export default click;
