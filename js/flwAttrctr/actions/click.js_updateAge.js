// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs";
import gState from "./gState";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import makeItOneClickOlder from "./makeItOneClickOlder";
import getAllFlwItems from "./getAllFlwItems";
//------------------------------------------------------------------
// updateAge()
//------------------------------------------------------------------
export default () /*: void */ => {
  // Get all the flwItems
  const flwItems = getAllFlwItems();
  flwItems.map(makeItOneClickOlder);
};
