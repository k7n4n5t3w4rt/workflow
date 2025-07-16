// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import getFlwMpSteps from "./getFlwMpSteps.js";
import checkStepLimitAndPullHeadless from "./checkStepLimitAndPullHeadless.js";
//------------------------------------------------------------------
// pullFlwItemsHeadless()
//------------------------------------------------------------------
export const pullFlwItemsHeadless = () /*: void */ => {
  console.log("pullFlwItemsHeadless(): Starting to pull flow items");
  const flwMpSteps = getFlwMpSteps();
  flwMpSteps.reduceRight(checkStepLimitAndPullHeadless(), null);
  if (gState().get("flwItmsPulledCount") > 0) {
    console.log(
      `pullFlwItemsHeadless(): Pulled ${gState().get(
        "flwItmsPulledCount",
      )} flow items`,
    );
    gState().set("flwItmsPulledCount", 0);
    pullFlwItemsHeadless();
  }
};
export default pullFlwItemsHeadless;
