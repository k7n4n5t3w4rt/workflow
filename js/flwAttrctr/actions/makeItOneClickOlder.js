// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import calculateFlwTimeMax from "./calculateFlwTimeMax.js";
//------------------------------------------------------------------
// makeItOneClickOlder()
//------------------------------------------------------------------
export default (flwItem /*: FlwItem */) /*: FlwItem */ => {
  flwItem.dStepsAges[flwItem.dStpIndex.toString()] += 1;
  if (flwItem.dStpIndex !== 0) {
    flwItem.dAge += 1;
    // if (gSttngs().get("death") > 0) {
    const opacity = 1 - flwItem.dAge / calculateFlwTimeMax() / 20;
    if (opacity < flwItem.material.opacity) {
      flwItem.material.opacity = opacity;
    }
    flwItem.material.needsUpdate = true;
    // }
  }
  return flwItem;
};
