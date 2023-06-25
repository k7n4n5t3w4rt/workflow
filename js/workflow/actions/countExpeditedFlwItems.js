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
      gSttngs().get("expdtLimit") > 0 &&
      gState().get("expdtCount") < gSttngs().get("expdtLimit") &&
      flwItem.dExpedite == true
    ) {
      gState().set("expdtCount", gState().get("expdtCount") + 1);
    }
  });
};
