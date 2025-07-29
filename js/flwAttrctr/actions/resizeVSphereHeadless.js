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
import findRadius from "../calculations/findRadius.js";

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

  // We need to preserve the 1:1 relationship between value percentage and volume percentage
  // In the previous implementation, radius was calculated as (total * scale) / 10
  // To maintain visual similarity with a proper volume-based approach:

  // 1. Calculate base value proportional to the total
  const baseValue = total * scale;

  // 2. Calculate a baseline volume for sizing reference
  //    This helps set the initial scale of the sphere to match previous appearance
  const baselineVolume = 0.5; // Adjust if needed for initial sphere size

  // 3. Calculate the volume with a direct 1:1 relationship to value
  //    When baseValue doubles, volume doubles exactly
  const volume = (baseValue * baselineVolume) / 10;

  // 4. Calculate the radius from this volume
  //    This maintains the exact 1:1 relationship between value % increase and volume % increase
  const newRadius = findRadius(volume);

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
