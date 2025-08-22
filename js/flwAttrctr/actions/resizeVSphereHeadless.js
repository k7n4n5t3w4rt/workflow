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
  const lastValue = gState().get("vQueue").total(); // PREV: total value from queue sum
  // const lastValue /*: number */ = gState().get("vQueue").lastValueAdded(); // NOW: only last added value (this is flwItem.dValue i.e., cube scale)
  // console.log("resizeVSphereHeadless: lastValue =", lastValue);
  if (lastValue === 0) {
    return;
  }

  // --- Compute equal-volume sphere target from the last cube's world volume ---
  // lastValue is the cube's scale (s). World cube volume: x*y*z*s^3
  const baseX = gSttngs().get("x");
  const baseY = gSttngs().get("y");
  const baseZ = gSttngs().get("z");
  const cubeVolume /*: number */ =
    baseX * baseY * baseZ * Math.pow(lastValue, 3);

  // 2. Calculate the radius from this cube-equivalent volume
  const newRadius = findRadius(cubeVolume);

  // DEBUG: Verify that sphere volume from radius equals cube volume
  const vCube = cubeVolume;
  const vFromRadius = (4 / 3) * Math.PI * Math.pow(newRadius, 3);
  // console.log(
  //   "cubeVolume=",
  //   vCube,
  //   "vFromRadius=",
  //   vFromRadius,
  //   "edge=",
  //   baseX * lastValue,
  //   "radius=",
  //   newRadius,
  // );

  gState().get("vSphere").dNewRadius = newRadius;

  // --- State logic from animatePosition() ---
  const offset =
    (Math.floor(
      (gState().get("vSphere").dNewRadius / gSttngs().get("step")) * 100,
    ) /
      100) *
    gSttngs().get("step");

  const newZ = calculateEndPositionZ() - offset;
  gState().get("vSphere").dPosition.z = newZ;
  gState().get("endPosition").z = newZ;
};

export default resizeVSphereHeadless;
