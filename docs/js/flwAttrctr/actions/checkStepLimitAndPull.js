// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import getFlowStepLimit from "./getFlowStepLimit.js";
import getAvailableLimitForStep from "./getAvailableLimitForStep.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import pullFromPreviousStep from "./pullFromPreviousStep.js";
//------------------------------------------------------------------
// checkStepLimitAndPull()
//------------------------------------------------------------------
export default (
  // This function is called using `reduceRight()` in `pullFlwItems()`:
  //  ...
  //  flwMpSteps.reduceRight(checkStepLimitAndPull, null);
  //  ...
  // Because of the way the "accumulator" parameter works with `reduceRight()`,
  // we need the _ or the Done step is skipped - https://developer.mozilla.org/ \
  // en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight
  _ /*: null | void */,
  flwMpStpItems /*: FlwMpItems */,
  flwMpStpKeyNumber /*: number */,
) => {
  // We can't pull anything if we're already at the backlog
  if (flwMpStpKeyNumber === 0) {
    return;
  }
  // Get the limit of the current step
  let flwStpLimit = getFlowStepLimit(flwMpStpKeyNumber);
  let availableLimit /*: "no limit" | 0 | number */ = getAvailableLimitForStep(
    flwStpLimit,
    flwMpStpItems,
  );
  pullFromPreviousStep(flwMpStpKeyNumber - 1, availableLimit);
};
