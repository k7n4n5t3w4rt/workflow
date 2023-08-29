// @flow
//------------------------------------------------------------------
// IMPORT: GLOBAL
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";

//------------------------------------------------------------------
// inTouch()
//------------------------------------------------------------------
export default (flwItem /*: FlwItem */, index /*:number */) /*: boolean */ => {
  let dStpIndex = flwItem.dStpIndex;
  if (dStpIndex > gSttngs().get("steps").length - 1) {
    dStpIndex = gSttngs().get("steps").length - 1;
    flwItem.dStpIndex = dStpIndex;
  }
  const stpStatus = gSttngs().get("steps")[dStpIndex].status;
  // If this flwItem is in the backlog, don't update it
  if (stpStatus !== "touch") {
    flwItem.dDysRmnngThisStep = 0;
    return false;
  }
  return true;
};
