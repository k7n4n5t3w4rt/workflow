// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import expdtIsOn from "./expdtIsOn.js";
import getAllFlwItems from "./getAllFlwItems.js";

//------------------------------------------------------------------
// calculateExpdtWip()
//------------------------------------------------------------------
export default () /*: number */ => {
  return getAllFlwItems().reduce(
    (_ /*: number */, flwItem /*: FlwItem */) /*: number */ => {
      if (
        expdtIsOn() === true &&
        flwItem.dExpedite === true &&
        // The flwItem is not in the backlog or in Done
        (gSttngs().get("steps")[flwItem.dStpIndex].status === "touch" ||
          gSttngs().get("steps")[flwItem.dStpIndex].status === "wait")
      ) {
        return (_ += 1);
      } else {
        return _;
      }
    },
    0,
  );
};
