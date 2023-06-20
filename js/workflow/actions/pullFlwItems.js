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
//------------------------------------------------------------------
// pullFlwItems()
//------------------------------------------------------------------
export default () => {
  // Get the flwMpSteps  as an array (the flwMap is an "hash map" object)
  const flwMpSteps = getFlwMpSteps();
  // reduceRight() starts at the end of the array and works backwards.
  // For each step, check the limit and, if there is space, pull from
  // the previous step
  flwMpSteps.reduceRight(checkStepLimitAndPull, null);
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
  // Get the limit of the current step
  const flwStpLimit = gSttngs().steps[flwMpStpKeyNumber].limit;
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
  }
};
//------------------------------------------------------------------
// pullFromPreviousStep()
//------------------------------------------------------------------
const pullFromPreviousStep = (
  flwMpStpKeyNumber /*: number */,
  availableLimit /*: "no limit" | number */,
) => {
  // We could be at the 'beginning' of the flow map
  if (flwMpStpKeyNumber < 0) {
    return;
  }
  const flwMpStpItems = gState().flwMap[flwMpStpKeyNumber.toString()];
  if (flwMpStpItems.length > 0) {
    // For each flwItem in this step...
    flwMpStpItems.reduce(pullFlowItem, availableLimit);
  }
};
//------------------------------------------------------------------
// pullFlowItem()
//------------------------------------------------------------------
const pullFlowItem = (
  availableLimit /*: "no limit" | number */,
  flwItem /*: FlwItem */,
  index /*: number */,
) => {
  // Check if the fwItem has died of old age
  if (gSttngs().death > 0 && flwItem.dAge >= gSttngs().death) {
    return availableLimit;
  }
  // This will happen when we have used up the availableLimit
  // and we've pulled the last flwItem we can pull
  if (availableLimit === 0) {
    return availableLimit;
  } else if (availableLimit !== "no limit") {
    // If we have a limit, then decrement it
    availableLimit--;
  }

  if (
    // If the flwItem.dStpIndex is 0, then we are at the backlog, in
    // which case the dDysRmnngThisStep is not relevant
    flwItem.dStpIndex === 0 ||
    // This is a wait step so no work is being done
    gSttngs().steps[flwItem.dStpIndex].status === "wait" ||
    // In all other cases, we only want to move the flwItem if it is
    // not moving and it has no days remaining
    (flwItem.dDysRmnngThisStep <= 0 && !flwItem.dMoving)
  ) {
    move(flwItem);
    updateFlowMap(flwItem, index);
  }
  return availableLimit;
};
