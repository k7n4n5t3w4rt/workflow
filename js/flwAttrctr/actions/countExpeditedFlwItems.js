// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs";
import gState from "./gState";

//------------------------------------------------------------------
// countExpeditedFlwItemsInOneStep();
//------------------------------------------------------------------
export default (flwMpStpItems /*: FlwItem[] */) /*: number */ => {
  let expdtCount = 0;
  flwMpStpItems.forEach((flwItem /*: FlwItem */) => {
    if (flwItem.dExpedite == true) {
      expdtCount += 1;
    }
  });
  return expdtCount;
};
