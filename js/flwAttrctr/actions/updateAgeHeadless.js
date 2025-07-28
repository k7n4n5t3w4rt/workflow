// @flow
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import makeItOneClickOlderHeadless from "./makeItOneClickOlder.js";
import getAllFlwItems from "./getAllFlwItems.js";

//------------------------------------------------------------------
// updateAgeHeadless()
//------------------------------------------------------------------
export default () /*: void */ => {
  // Get all the flwItems
  const flwItems = getAllFlwItems();
  flwItems.map(makeItOneClickOlderHeadless);
};
