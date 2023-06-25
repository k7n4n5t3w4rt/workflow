// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import move from "./move.js";
import getFlwMpSteps from "./getFlwMpSteps.js";
import updateFlowMap from "./updateFlowMap.js";
import countExpeditedFlwItemsInOneStep from "./countExpeditedFlwItemsInOneStep.js";
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
//------------------------------------------------------------------
// checkStepLimitAndPull()
//------------------------------------------------------------------
const checkStepLimitAndPull = (
  // Note: We need the _ or the Done step is skipped.
  _ /*: null | void */,
  flwMpStpItems /*: FlwMpItems */,
  flwMpStpKeyNumber /*: number */,
) => {
  if (flwMpStpKeyNumber === 0) {
    return;
  }

  // Get the limit of the current step
  let flwStpLimit = gSttngs().get("steps")[flwMpStpKeyNumber].limit;
  if (flwStpLimit === 0) {
    // Check if `limit` is set in the global steps settings
    if (
      // If we're not on the first or last step
      flwMpStpKeyNumber !== 0 &&
      flwMpStpKeyNumber !== gSttngs().get("steps").length - 1 &&
      // And if the global wipLimit is not 0
      gSttngs().get("wipLimit") !== 0
    ) {
      // Use the global wipLimit
      flwStpLimit = gSttngs().get("wipLimit");
    }
  }
  // Check that the number of flwItems in this step is less than
  // the limit. Note that a limit of 0 means no limit
  if (flwMpStpItems.length < flwStpLimit || flwStpLimit === 0) {
    let availableLimit /*: "no limit" | 0 | number */ = 0;
    // If the limit for this step is 0, then there is no limit
    // to the availableLimit
    if (flwStpLimit === 0) {
      availableLimit = "no limit";
    } else {
      // Because of the check above, this will be between 1 and
      // the flow step limit
      availableLimit = flwStpLimit - flwMpStpItems.length;
    }
    pullFromPreviousStep(flwMpStpKeyNumber - 1, availableLimit);
  } else {
  }
};
//------------------------------------------------------------------
// pullFromPreviousStep()
//------------------------------------------------------------------
const pullFromPreviousStep = (
  flwStpIndex /*: number */,
  availableLimit /*: "no limit" | number */,
) => {
  // We could be at the 'beginning' of the flow map
  if (flwStpIndex < 0) {
    return;
  }
  const stpKey = flwStpIndex.toString();
  const flwItems = gState().get("flwMap")[stpKey];
  if (flwItems.length > 0) {
    // Pull the expedited flwItems first
    let expediteFlag = true;
    const nrmlAvailableLimit = flwItems.reduce(
      pullFlowItem(expediteFlag),
      availableLimit,
    );
    expediteFlag = false;
    flwItems.reduce(pullFlowItem(expediteFlag), nrmlAvailableLimit);
  } else {
  }
};
//------------------------------------------------------------------
// pullFlowItem()
//------------------------------------------------------------------
const pullFlowItem =
  (
    expediteFlag /*: boolean */,
  ) /*: (availableLimit: "no limit" | number, flwItem: FlwItem, index: number) => "no limit" | number */ =>
  (
    availableLimit /*: "no limit" | number */,
    flwItem /*: FlwItem */,
    index /*: number */,
  ) /*: "no limit" | number */ => {
    // Check if the fwItem has died of old age
    if (gSttngs().get("death") > 0 && flwItem.dAge >= gSttngs().get("death")) {
      return availableLimit;
    }
    if (flwItem.dExpedite !== expediteFlag) {
      return availableLimit;
    }
    if (
      // If the flwItem.dStpIndex is 0, then we are at the backlog, in
      // which case the dDysRmnngThisStep is not relevant
      flwItem.dStpIndex === 0 ||
      // This is a wait step so no work is being done
      gSttngs().get("steps")[flwItem.dStpIndex].status === "wait" ||
      // In all other cases, we only want to move the flwItem if it is
      // not moving and it has no days remaining
      (flwItem.dDysRmnngThisStep <= 0 && !flwItem.dMoving)
    ) {
      // This will happen when we have used up the availableLimit
      // and we've pulled the last flwItem we can pull
      if (availableLimit === 0) {
        if (flwItem.dStpIndex === 0) {
        }
        return availableLimit;
      } else if (availableLimit !== "no limit") {
        // If we have a limit, then decrement it
        availableLimit--;
      }

      move(flwItem);
      updateFlowMap(flwItem, index);
      gState().set(
        "flwItmsPulledCount",
        gState().get("flwItmsPulledCount") + 1,
      );
    } else {
    }
    return availableLimit;
  };
export default pullFlwItems;
