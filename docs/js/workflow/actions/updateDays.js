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
import dragFunction from "./dragFunction.js";
import skipForWip from "./skipForWip.js";
import makeItOneClickOlder from "./makeItOneClickOlder.js";
import expediteNewFlwItems from "./expediteNewFlwItems.js";
import getAllFlwItems from "./getAllFlwItems.js";
import {
  numberExpiditedDevUnits,
  numberNormalDevUnits,
} from "./numberDevUnits.js";
import theNonDead from "./theNonDead.js";
import inTouch from "./inTouch.js";
import applyAdjustedReduction from "./applyAdjustedReduction.js";
import stepWip from "./stepWip.js";
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
  // If expdtLimit is set, we need to process the expedited items first.
  if (gSttngs().get("expdtLimit") > 0) {
    // Get the expedited items
    const expdtFlwItems = flwItems.filter((flwItem /*: FlwItem */) => {
      return flwItem.dExpedite === true;
    });
    const nmExpdtDvUnits = numberExpiditedDevUnits();
    applyAdjustedReduction(stepWip)(expdtFlwItems, nmExpdtDvUnits);
  }
  const normalFlwItems = flwItems.filter((flwItem /*: FlwItem */) => {
    // We only want to exclude expedited items if the expedite limit is set.
    // There might be expedited items left in the flwMap if the limit
    // was set and then removed.
    if (gSttngs().get("expdtLimit") > 0) {
      return flwItem.dExpedite === false;
    } else {
      return flwItem;
    }
  });
  const nmNrmlDvUnits = numberNormalDevUnits();
  // normalFlwItems.forEach((flwItem /*: FlwItem */) => {
  //   flwItem.dSkipForWip = skipForWip(nmNrmlDvUnits, flwItems.length);
  // });
  applyAdjustedReduction(stepWip)(normalFlwItems, nmNrmlDvUnits);
};
