// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gState from "./gState";
//------------------------------------------------------------------
// hideReticule()
//------------------------------------------------------------------
export const hideReticule = () => {
  // Hide the reticle (only if it exists)
  const scnData = gState().get("scnData");
  const reticleStuff = scnData && scnData.reticleStuff;
  if (
    reticleStuff &&
    reticleStuff.reticle &&
    typeof reticleStuff.reticle.visible !== "undefined"
  ) {
    if (reticleStuff.reticle.visible) {
      reticleStuff.active = false;
    }
  }
};
export default hideReticule;
