// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";

//------------------------------------------------------------------
// countExpeditedFlwItems();
//------------------------------------------------------------------
export default (flwMpStpItems /*: FlwItem[] */) /*: void */ => {
  flwMpStpItems.forEach((flwItem /*: FlwItem */) => {
    if (
      gSttngs().expdtLimit > 0 &&
      gState().expdtCount < gSttngs().expdtLimit &&
      flwItem.dExpedite == true
    ) {
      gState().expdtCount += 1;
    }
  });
};
