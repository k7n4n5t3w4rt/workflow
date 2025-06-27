// @flow
//------------------------------------------------------------------
// IMPORT: GLOBAL
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// inTouchWithDaysRemaining()
//------------------------------------------------------------------
export const inTouchWithDaysRemaining = (
  flwItem /*: FlwItem */,
  index /*:number */,
) /*: boolean */ => {
  let dStpIndex = flwItem.dStpIndex;
  const stpStatus = gSttngs().get("steps")[dStpIndex].status;
  const dDysRmnngThisStep = flwItem.dDysRmnngThisStep;
  // Just incase it's screwy  - like maybe the number of steps setting
  // has just been changed
  if (dStpIndex > gSttngs().get("steps").length - 1) {
    flwItem.dStpIndex = gSttngs().get("steps").length - 1;
  }
  if (stpStatus === "touch" && dDysRmnngThisStep > 0) {
    return true;
  } else {
    return false;
  }
};
export default inTouchWithDaysRemaining;
