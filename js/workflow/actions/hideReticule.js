// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gState from "./gState.js";
//------------------------------------------------------------------
// hideReticule()
//------------------------------------------------------------------
export const hideReticule = () => {
  // Hide the reticle
  if (gState().get("scnData").reticleStuff.reticle.visible) {
    gState().get("scnData").reticleStuff.active = false;
  }
};
export default hideReticule;
