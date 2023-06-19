// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import getFlwMpSteps from "./getFlwMpSteps.js";
import { expand } from "rxjs/operators";

//------------------------------------------------------------------
// setExpedite(flwItem)
//------------------------------------------------------------------
export default () => {
  // Reset the expedite count
  gState().expdtCount = 0;
  // First, decrement gState().expedite to cover all the expedite items
  const flwMpSteps = getFlwMpSteps();
  flwMpSteps.forEach((flwMpStpItems /*: FlwItem[] */) => {
    const flwMpStpItmsCopy = [...flwMpStpItems].reverse();
    flwMpStpItmsCopy.forEach((flwItem /*: FlwItem */) => {
      if (
        gSttngs().expediteQueue > 0 &&
        gState().expdtCount < gSttngs().expediteQueue &&
        flwItem.dExpedite == true
      ) {
        gState().expdtCount += 1;
      }
    });
  });
  // Then, set the expedite flag on some new items to make up the difference
  flwMpSteps.forEach((flwMpStpItems /*: FlwItem[] */) => {
    const flwMpStpItmsCopy = [...flwMpStpItems].reverse();
    flwMpStpItmsCopy.forEach((flwItem /*: FlwItem */) => {
      if (
        gSttngs().expediteQueue > 0 &&
        gState().expdtCount < gSttngs().expediteQueue &&
        flwItem.dExpedite == false
      ) {
        flwItem.dExpedite = true;
        gState().expdtCount += 1;
      }
    });
  });
};
