// @flow
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import makeItOneClickOlderDisplay from "./makeItOneClickOlderDisplay.js";
import getAllFlwItems from "./getAllFlwItems.js";

//------------------------------------------------------------------
// updateAgeDisplay()
//------------------------------------------------------------------
export default () /*: void */ => {
  // Get all the flwItems
  const flwItems = getAllFlwItems();
  flwItems.map(makeItOneClickOlderDisplay);
};
