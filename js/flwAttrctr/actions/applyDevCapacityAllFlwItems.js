// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import applyDevCapacityToFlwItem from "./applyDevCapacityToFlwItem.js";
import recursivelyPullFlwItems from "./recursivelyPullFlwItems.js";
import updateDays from "./updateDays.js";
//------------------------------------------------------------------
// applyDevCapacityAllFlwItems()
//------------------------------------------------------------------
export const applyDevCapacityAllFlwItems = (
  flwItems /*: FlwItem[] */,
  expediteFlag /*: boolean */,
  spareDevDays /*: SpareDevDays */ = {},
  usingSpareDevDays /*: boolean */ = false,
) /*: void */ => {
  // Apply the adjusted reduction to each flow item.
  // ...and store the step indexes
  const stepIndexes = {};
  flwItems.forEach((flwItem /*: FlwItem */) /*: void */ => {
    stepIndexes[flwItem.dStpIndex.toString()] = true;
    applyDevCapacityToFlwItem(
      expediteFlag,
      spareDevDays,
      usingSpareDevDays,
    )(flwItem);
  });
  const spareDevDaysTotal = Object.keys(spareDevDays).reduce(
    (_ /*: number */, key /*: string */) /*: number */ => {
      // Only consider spareDevDays for indexes for which ther are flow items
      if (stepIndexes[key] === true) {
        return (_ += spareDevDays[key]);
      } else {
        return _;
      }
    },
    0,
  );
  if (spareDevDaysTotal > 0) {
    // Set thefag to turn of the movin animation
    usingSpareDevDays = true;
    // Pull flow items as usual as if this was a cick. Hopefully, this will
    // also update throughput etc.
    // Call this function again, but using up the spare capacity.
    recursivelyPullFlwItems();
    updateDays(spareDevDays, usingSpareDevDays);
  }
};
export default applyDevCapacityAllFlwItems;
