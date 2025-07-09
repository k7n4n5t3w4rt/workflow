// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import expdtIsOn from "./expdtIsOn";
import getAllFlwItems from "./getAllFlwItems";

//------------------------------------------------------------------
// calculateExpdtWip()
//------------------------------------------------------------------
export default () /*: number */ => {
  return getAllFlwItems().reduce(
    (_ /*: number */, flwItem /*: FlwItem */) /*: number */ => {
      let dStpIndex = flwItem.dStpIndex;
      if (dStpIndex > gSttngs().get("steps").length - 1) {
        dStpIndex = gSttngs().get("steps").length - 1;
        flwItem.dStpIndex = dStpIndex;
      }
      if (
        expdtIsOn() === true &&
        flwItem.dExpedite === true &&
        // The flwItem is not in the backlog or in Done
        (gSttngs().get("steps")[dStpIndex].status === "touch" ||
          gSttngs().get("steps")[dStpIndex].status === "wait")
      ) {
        return (_ += 1);
      } else {
        return _;
      }
    },
    0,
  );
};
