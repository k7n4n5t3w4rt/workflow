// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";

//------------------------------------------------------------------
// makeItOneClickOlderHeadless()
//
// This function updates the state of a flow item to make it one
// "click" older, but without any visual changes. It's the
// state-only counterpart to the visual `makeItOneClickOlder()`
// function.
//------------------------------------------------------------------
export default (flwItem /*: FlwItem */) /*: FlwItem */ => {
  let dStpIndex = flwItem.dStpIndex;
  if (dStpIndex > gSttngs().get("steps").length - 1) {
    dStpIndex = gSttngs().get("steps").length - 1;
    flwItem.dStpIndex = dStpIndex;
  }
  flwItem.dStepsAges[dStpIndex.toString()] += 1;
  if (dStpIndex !== 0) {
    flwItem.dAge += 1;
  }
  return flwItem;
};
