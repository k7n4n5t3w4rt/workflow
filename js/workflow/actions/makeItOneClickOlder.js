// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// makeItOneClickOlder()
//------------------------------------------------------------------
export default (flwItem /*: FlwItem */) /*: FlwItem */ => {
  flwItem.dAge++;
  if (gSttngs().death > 0) {
    flwItem.material.opacity = 1 - flwItem.dAge / gSttngs().death;
    flwItem.material.needsUpdate = true;
  }
  return flwItem;
};
