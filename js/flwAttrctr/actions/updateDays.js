// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import removeFlowItem from "./removeFlowItem.js";
import removeDoneFlwItmsFromFlwMap from "./removeDoneFlwItmsFromFlwMap.js";
import getFlwMpSteps from "./getFlwMpSteps.js";
import skipForWip from "./skipForWip.js";
import makeItOneClickOlder from "./makeItOneClickOlder.js";
import expediteNewFlwItems from "./expediteNewFlwItems.js";
import getAllFlwItems from "./getAllFlwItems.js";
import theNonDead from "./theNonDead.js";
import inTouch from "./inTouch.js";
import updateDaysRemainingExpdt from "./updateDaysRemainingExpdt.js";
import updateDaysRemainingNrml from "./updateDaysRemainingNrml.js";
//------------------------------------------------------------------
// updateDays()
//------------------------------------------------------------------
export default () /*: void */ => {
  // Get all the flwItems, remove the dead ones, and then remove the done ones.
  const flwItems = getAllFlwItems()
    .filter(theNonDead(removeFlowItem, removeDoneFlwItmsFromFlwMap))
    .filter(inTouch);
  //------------------------------------------------------------------
  // EXPEDITED
  //------------------------------------------------------------------
  // If expdtQueueLength is set, we need to process the expedited items first.
  if (
    gSttngs().get("expdtQueueLength") > 0 &&
    gSttngs().get("expdtDvUnitsFactor") > 0
  ) {
    // Get the expedited items
    updateDaysRemainingExpdt(flwItems);
  }
  updateDaysRemainingNrml(flwItems);
};
