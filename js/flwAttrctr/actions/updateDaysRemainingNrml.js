// @flow
//------------------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------------------
import { numberNormalDevUnits } from "./numberDevUnits.js";
import applyDevCapacityAllFlwItems from "./applyDevCapacityAllFlwItems.js";
import stepWip from "./stepWip.js";
import skipForWip from "./skipForWip.js";
import expdtIsOn from "./expdtIsOn.js";
//------------------------------------------------------------------------------
// updateDaysRemainingNrml()
//------------------------------------------------------------------------------
export default (
  flwItems /*: FlwItem[]*/,
  spareDevDays /*: SpareDevDays */ = {},
  usingSpareDevDays /*: boolean */ = false,
) /*: void */ => {
  const normalFlwItems = flwItems.filter(
    (flwItem /*: FlwItem */) /*: boolean */ => {
      // We only want to exclude expedited items if the expedite limit is set.
      // There might be expedited items left in the flwMap if the limit
      // was set and then removed.
      if (expdtIsOn() === true) {
        return flwItem.dExpedite === false;
      } else {
        return true;
      }
    },
  );
  const expediteFlag /*: boolean */ = false;
  applyDevCapacityAllFlwItems(
    normalFlwItems,
    expediteFlag,
    spareDevDays,
    usingSpareDevDays,
  );
};
