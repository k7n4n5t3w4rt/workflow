// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import newFlwItem from "./newFlwItem.js";
//------------------------------------------------------------------
// FUNCTION: addNewFlowItemsAtArrivalRate()
//------------------------------------------------------------------
export default () => {
  if (Math.floor(gState().get("arrivalNumber")) >= 1) {
    if (
      gState().get("flwMap")["0"].length < gSttngs().get("steps")["0"].limit ||
      gSttngs().get("steps")["0"].limit === 0
    ) {
      for (let i = 1; i <= gState().get("arrivalNumber"); i++) {
        newFlwItem();
      }
      gState().set(
        "arrivalNumber",
        (gState().get("arrivalNumber") % 1) + gSttngs().get("arrivalRate"),
      );
    }
  } else {
    gState().set(
      "arrivalNumber",
      gState().get("arrivalNumber") + gSttngs().get("arrivalRate"),
    );
  }
};
