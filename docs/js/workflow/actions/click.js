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

const click = () /*: void */ => {
  if (gState().clicks % gSttngs().timeBox === 0) {
  }
  gState().clicks++;
  animateClickCube();
};

//------------------------------------------------------------------
// onClickComplete()
//------------------------------------------------------------------
export const onClickComplete = () /*: void */ => {
  updateWip();
  setExpedite();
  // For testing, we need to pass in removeFlowItem
  filterDoneItems(removeFlowItem)();
  resizeVSphere();
  updateAgeAndDaysForAllItems();
  newFlwItem();
  pullFlwItems();
  // Start the click cycle over again
  click();
};
export default click;
