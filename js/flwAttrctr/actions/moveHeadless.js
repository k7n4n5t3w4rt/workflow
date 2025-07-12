// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import calculateNewPosition from "./calculateNewPosition.js";

//------------------------------------------------------------------
// moveHeadless()
//
// This function updates the state of a flow item to reflect its
// movement to the next step in the workflow, but without any
// visual animations. It's the state-only counterpart to the
// visual `move()` function.
//------------------------------------------------------------------
const moveHeadless = (flwItem /*: FlwItem */) /*: void */ => {
  // In the visual version, dMoving prevents multiple animations.
  // Here, it's set momentarily to maintain state consistency in
  // case other logic checks this flag.
  flwItem.dMoving = true;

  // Calculate the item's new coordinates and update its state.
  flwItem.dPosition = { ...calculateNewPosition(flwItem) };

  // Reset the days remaining for the item in its new step, but
  // only if it's not in the final "Done" step.
  if (flwItem.dStpIndex < gSttngs().get("steps").length - 1) {
    flwItem.dDysRmnngThisStep = flwItem.dDysEachTouchStep;
  }

  // The visual `move` function has a recursive animation call to
  // handle items moving to a final "done" position. In the headless
  // version, `calculateNewPosition` handles this in a single step,
  // so no recursion is needed.

  flwItem.dMoving = false;
};

export default moveHeadless;
