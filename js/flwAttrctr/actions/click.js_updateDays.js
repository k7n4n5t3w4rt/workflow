// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import getFlwMpSteps from "./getFlwMpSteps.js";
import skipForWip from "./skipForWip.js";
import expediteNewFlwItems from "./expediteNewFlwItems.js";
import getAllFlwItems from "./getAllFlwItems.js";
import theNonDead from "./theNonDead.js";
import inTouchWithDaysRemaining from "./click.js_updateDays.js_inTouchWithDaysRemaining.js";
import updateDaysRemainingExpdt from "./updateDaysRemainingExpdt.js";
import updateDaysRemainingNrml from "./updateDaysRemainingNrml.js";
//------------------------------------------------------------------
// updateDays()
//------------------------------------------------------------------
export default (
  spareDevDays /*: SpareDevDays */ = {},
  usingSpareDevDays /*: boolean */ = false,
) /*: void */ => {
  // Get all the flwItems, remove the dead ones, and then remove the done ones.
  const flwItems = getAllFlwItems()
    .filter(theNonDead)
    .filter(inTouchWithDaysRemaining);
  //------------------------------------------------------------------
  // EXPEDITED
  //------------------------------------------------------------------
  // If expdtQueueLength is set, we need to process the expedited items first.
  if (
    gSttngs().get("expdtQueueLength") > 0 &&
    gSttngs().get("expdtDvUnitsFactor") > 0
  ) {
    // Get the expedited items
    updateDaysRemainingExpdt(flwItems, spareDevDays, usingSpareDevDays);
  }
  updateDaysRemainingNrml(flwItems, spareDevDays, usingSpareDevDays);
};
