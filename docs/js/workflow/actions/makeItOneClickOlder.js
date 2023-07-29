// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// makeItOneClickOlder()
//------------------------------------------------------------------
export default (flwItem /*: FlwItem */) /*: FlwItem */ => {
  if (flwItem.dStpIndex === 0) {
    flwItem.dBacklogAge++;
  } else {
    flwItem.dAge++;
    // if (gSttngs().get("death") > 0) {
    const opacity = 1 - flwItem.dAge / gSttngs().get("flwTimeMax") / 3;
    if (opacity < flwItem.material.opacity) {
      flwItem.material.opacity = opacity;
    }
    flwItem.material.needsUpdate = true;
    // }
  }
  return flwItem;
};
