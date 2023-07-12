// @flow
//------------------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------------------
import { numberNormalDevUnits } from "./numberDevUnits.js";
import applyAdjustedReduction from "./applyAdjustedReduction.js";
import stepWip from "./stepWip.js";
//------------------------------------------------------------------------------
// updateDaysRemainingNrml()
//------------------------------------------------------------------------------
export default (flwItems /*: FlwItem[]*/) /*: void */ => {
  const normalFlwItems = flwItems.filter(
    (flwItem /*: FlwItem */) /*: boolean */ => {
      // We only want to exclude expedited items if the expedite limit is set.
      // There might be expedited items left in the flwMap if the limit
      // was set and then removed.
      if (gSttngs().get("expdtQueueLength") > 0) {
        return flwItem.dExpedite === false;
      } else {
        return true;
      }
    },
  );
  const nmNrmlDvUnits = numberNormalDevUnits();
  // normalFlwItems.forEach((flwItem /*: FlwItem */) => {
  //   flwItem.dSkipForWip = skipForWip(nmNrmlDvUnits, flwItems.length);
  // });
  applyAdjustedReduction(stepWip)(normalFlwItems, false);
};
