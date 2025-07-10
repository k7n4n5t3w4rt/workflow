// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import pullFlwItems from "./pullFlwItems.js";
//------------------------------------------------------------------
// FUNCTION: recursivelyPullFlwItems()
//------------------------------------------------------------------
export const recursivelyPullFlwItems = () /*: void */ => {
  gState().set("flwItmsPulledCount", 0);
  pullFlwItems();
};
export default recursivelyPullFlwItems;
