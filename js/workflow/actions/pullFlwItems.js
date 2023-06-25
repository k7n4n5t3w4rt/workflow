// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import getFlwMpSteps from "./getFlwMpSteps.js";
import countExpeditedFlwItemsInOneStep from "./countExpeditedFlwItemsInOneStep.js";
import checkStepLimitAndPull from "./checkStepLimitAndPull.js";
//------------------------------------------------------------------
// pullFlwItems()
//------------------------------------------------------------------
export const pullFlwItems = () => {
  // Get the flwMpSteps  as an array (the flwMap is an "hash map" object)
  const flwMpSteps = getFlwMpSteps();
  // reduceRight() starts at the end of the array and works backwards.
  // For each step, check the limit and, if there is space, pull from
  // the previous step
  flwMpSteps.reduceRight(checkStepLimitAndPull, null);
  // If we pulled any flwItems, we should do another run through in case
  // we can pull more. We only stop when there is nothing left to pull
  if (gState().get("flwItmsPulledCount") > 0) {
    // If this is remains zero then nothing was pulled and we can
    // exit the loop
    gState().set("flwItmsPulledCount", 0);
    pullFlwItems();
  }
};
export default pullFlwItems;
