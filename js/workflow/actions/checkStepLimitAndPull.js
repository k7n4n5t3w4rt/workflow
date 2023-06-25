// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import pullFromPreviousStep from "./pullFromPreviousStep.js";
//------------------------------------------------------------------
// checkStepLimitAndPull()
//------------------------------------------------------------------
export default (
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
