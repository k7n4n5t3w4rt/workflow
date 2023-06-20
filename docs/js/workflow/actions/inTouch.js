// @flow
//------------------------------------------------------------------
// IMPORT: GLOBAL
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";

//------------------------------------------------------------------
// inTouch()
//------------------------------------------------------------------
export default (flwItem /*: FlwItem */, index /*:number */) /*: boolean */ => {
  const stpStatus = gSttngs().steps[flwItem.dStpIndex].status;
  // If this flwItem is in the backlog, don't update it
  if (stpStatus !== "touch") {
    // console.log("inTouch: Filtering out this flwItem");
    flwItem.dDysRmnngThisStep = 0;
    return false;
  }
  return true;
};
