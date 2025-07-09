// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gState from "./gState";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import pullFlwItems from "./pullFlwItems";
//------------------------------------------------------------------
// FUNCTION: recursivelyPullFlwItems()
//------------------------------------------------------------------
export const recursivelyPullFlwItems = () /*: void */ => {
  gState().set("flwItmsPulledCount", 0);
  pullFlwItems();
};
export default recursivelyPullFlwItems;
