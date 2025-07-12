// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import calculateEndPositionZ from "./calculateEndPositionZ.js";

//------------------------------------------------------------------
// resizeVSphereHeadless()
//
// This function updates the state related to the vSphere's size
// and position based on the number of "done" items, but without
// any visual animations. It's the state-only counterpart to the
// visual `resizeVSphere()` function.
//------------------------------------------------------------------
export const resizeVSphereHeadless = () => {
  const total = gState().get("vQueue").total();
  if (total === 0) {
    return;
  }

  // --- State logic from animateScale() ---
  const scale = gSttngs().get("scale") || 0.07;
  const valueScaled = (total * scale) / 10;
  const newRadius = valueScaled / 1.0;
  gState().get("vSphere").dRadius = newRadius;

  // --- State logic from animatePosition() ---
  const offset =
    (Math.floor(
      (gState().get("vSphere").dRadius / gSttngs().get("step")) * 100,
    ) /
      100) *
    gSttngs().get("step");

  const newZ = calculateEndPositionZ() - offset;
  gState().get("vSphere").dPosition.z = newZ;
  gState().get("endPosition").z = newZ;
};

export default resizeVSphereHeadless;
