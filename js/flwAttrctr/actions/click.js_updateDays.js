// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs";
import gState from "./gState";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import getFlwMpSteps from "./getFlwMpSteps";
import skipForWip from "./skipForWip";
import makeItOneClickOlder from "./makeItOneClickOlder";
import expediteNewFlwItems from "./expediteNewFlwItems";
import getAllFlwItems from "./getAllFlwItems";
import theNonDead from "./theNonDead";
import inTouchWithDaysRemaining from "./click.js_updateDays.js_inTouchWithDaysRemaining";
import updateDaysRemainingExpdt from "./updateDaysRemainingExpdt";
import updateDaysRemainingNrml from "./updateDaysRemainingNrml";
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
