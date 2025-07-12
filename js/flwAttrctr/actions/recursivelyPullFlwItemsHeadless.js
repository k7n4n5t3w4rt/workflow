// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import pullFlwItemsHeadless from "./pullFlwItemsHeadless.js";
//------------------------------------------------------------------
// FUNCTION: recursivelyPullFlwItemsHeadless()
//------------------------------------------------------------------
export const recursivelyPullFlwItemsHeadless = () /*: void */ => {
  gState().set("flwItmsPulledCount", 0);
  pullFlwItemsHeadless();
};
export default recursivelyPullFlwItemsHeadless;
