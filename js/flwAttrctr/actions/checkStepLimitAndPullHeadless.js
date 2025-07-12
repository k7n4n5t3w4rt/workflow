// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import getFlowStepLimit from "./getFlowStepLimit.js";
import getAvailableLimitForStep from "./getAvailableLimitForStep.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import pullFromPreviousStepHeadless from "./pullFromPreviousStepHeadless.js";
//------------------------------------------------------------------
// checkStepLimitAndPullHeadless()
//------------------------------------------------------------------
export const checkStepLimitAndPullHeadless =
  () /*: (_:null|void,flwMpStpItems:any, flwMpStpKeyNumber:any) => void */ =>
  (
    _ /*: null | void */,
    flwMpStpItems /*: FlwMpItems */,
    flwMpStpKeyNumber /*: number */,
  ) /*: void */ => {
    if (flwMpStpKeyNumber === 0) {
      return;
    }
    let flwStpLimit = getFlowStepLimit(flwMpStpKeyNumber);
    let availableLimit /*: "no limit" | 0 | number */ =
      getAvailableLimitForStep(flwStpLimit, flwMpStpItems);
    pullFromPreviousStepHeadless(flwMpStpKeyNumber - 1, availableLimit);
  };
export default checkStepLimitAndPullHeadless;
