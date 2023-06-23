// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import makeItOneClickOlder from "./makeItOneClickOlder.js";
import countExpeditedFlwItems from "./countExpeditedFlwItems.js";
import getAllFlwItems from "./getAllFlwItems.js";
//------------------------------------------------------------------
// updateAgeAndDaysForAllItems()
//------------------------------------------------------------------
export default () /*: void */ => {
  // Get all the flwItems
  const flwItems = getAllFlwItems();
  flwItems.map(makeItOneClickOlder);
};
