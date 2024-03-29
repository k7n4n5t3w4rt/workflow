// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import expdtIsOn from "./expdtIsOn.js";
import getAllFlwItems from "./getAllFlwItems.js";

//------------------------------------------------------------------
// calculateNrmlWip()
//------------------------------------------------------------------
export default () /*: number */ => {
  return getAllFlwItems().reduce((_ /*: number */, flwItem /*: FlwItem */) => {
    let dStpIndex = flwItem.dStpIndex;
    if (dStpIndex > gSttngs().get("steps").length - 1) {
      dStpIndex = gSttngs().get("steps").length - 1;
      flwItem.dStpIndex = dStpIndex;
    }
    if (
      (!expdtIsOn() || flwItem.dExpedite === false) &&
      // i.e. the flwItem is not in the backlog or in Done
      (gSttngs().get("steps")[dStpIndex].status === "touch" ||
        gSttngs().get("steps")[dStpIndex].status === "wait")
    ) {
      return (_ += 1);
    } else {
      return _;
    }
  }, 0);
};
