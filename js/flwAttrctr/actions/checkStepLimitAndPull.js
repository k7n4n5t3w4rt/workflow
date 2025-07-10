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
export const checkStepLimitAndPull =
  () /*: (_:null|void,flwMpStpItems:any, flwMpStpKeyNumber:any) => void */ =>
  (
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
  ) /*: void */ => {
    // We can't pull anything if we're already at the backlog
    if (flwMpStpKeyNumber === 0) {
      return;
    }
    // Get the limit of the current step
    let flwStpLimit = getFlowStepLimit(flwMpStpKeyNumber);
    let availableLimit /*: "no limit" | 0 | number */ =
      getAvailableLimitForStep(flwStpLimit, flwMpStpItems);
    // if (availableLimit === 0) {
    //   return;
    // }
    pullFromPreviousStep(flwMpStpKeyNumber - 1, availableLimit);
  };
export default checkStepLimitAndPull;
