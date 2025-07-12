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
import updateFlowMap from "./updateFlowMap.js";
//------------------------------------------------------------------
// pullFlowItem()
//------------------------------------------------------------------
// This function is called from pullFromPreviousStep() in a reduce() to
// pull flwItems from the previous step - if ther is availableLimit or
// expedited flwItems
// NOTE: It's not great because it is doing three things at once. The
// `availableLimit` is being decremented and eventually returned as the
// output of `reduce()`, the flwItem is being moved AND the
// gState().get("flwItmsPulledCount") is being incremented. Also the flwMap
// is being updated.
// First, we make the `expediteFlag` available in a closure because it can't
// be passed around in the reduce() function. Also `move()` and `updateFlowMap()`
// for testing purposes
export default (
    expediteFlag /*: boolean */,
    move /*: (flwItem: FlwItem) => void */,
    updateFlowMap /*: (flwItem: FlwItem, index: number) => void */,
  ) /*: ( availableLimit: "no limit" | number, flwItem: FlwItem, index: number,) => number | string */ =>
  (
    availableLimit /*: "no limit" | number */,
    flwItem /*: FlwItem */,
    index /*: number */,
  ) /*: number | string */ => {
    const flwItmsToMove /*: FlwItmsToMove */ = gState().get("flwItmsToMove");
    //------------------------------------------------------------------
    // CHECKS -  We start with a log of checks to see if we should pull
    // the flwItem. If not, we return the availableLimit unchanged
    //------------------------------------------------------------------
    // We're either looking for expedited flwItems or normal flwItems - or
    // we don't care
    if (
      gSttngs().get("expdtQueueLength") > 0 &&
      flwItem.dExpedite !== expediteFlag
    ) {
      return availableLimit;
    }
    // Check if the fwItem has died of old age and ignore it if it has
    if (gSttngs().get("death") > 0 && flwItem.dAge >= gSttngs().get("death")) {
      return availableLimit;
    }
    let dStpIndex = flwItem.dStpIndex;
    if (dStpIndex > gSttngs().get("steps").length - 1) {
      dStpIndex = gSttngs().get("steps").length - 1;
      flwItem.dStpIndex = dStpIndex;
    }
    if (
      // If the flwItem.dStpIndex is 0, then we are at the backlog, in
      // which case the dDysRmnngThisStep is not relevant
      dStpIndex === 0 ||
      // This is a wait step so no work is being done
      gSttngs().get("steps")[dStpIndex].status === "wait" ||
      // In all other cases, we only want to move the flwItem if it is
      // not moving and it has no days remaining
      flwItem.dDysRmnngThisStep <= 0
    ) {
      // If the flwItem is expedited, we will make room for it even
      // if we have no availableLimit
      if (flwItem.dExpedite === false) {
        // This will happen when we have used up the availableLimit
        // and we've pulled the last flwItem we can pull -
        if (availableLimit === 0) {
          return availableLimit;
        }
      }
      // --------------------------------------------------------------
      // ACTIONS - We have a flwItem that we can pull, so we move it
      // and update the flwMap
      // --------------------------------------------------------------
      // Update the step index to the next step
      flwItem.dStpIndex += 1;
      // We don't want to reset the days remaining if the item is
      // in the last step, i.e. Done
      if (flwItem.dStpIndex < gSttngs().get("steps").length - 1) {
        flwItem.dDysRmnngThisStep = flwItem.dDysEachTouchStep;
      }
      flwItmsToMove[flwItem.name] = flwItem;
      updateFlowMap(flwItem, index);
      // In `pullFlwItems()` we check this is > 0 and do another run through.
      // We only stop when there is nothing left to pull
      gState().set(
        "flwItmsPulledCount",
        gState().get("flwItmsPulledCount") + 1,
      );
    }
    // `availableLimit` is the accumulator. If we have a limit, that is not yet
    // zero, then decrement it
    if (availableLimit !== "no limit" && availableLimit > 0) {
      // If we have a limit, then decrement it
      availableLimit--;
    }
    return availableLimit;
  };
