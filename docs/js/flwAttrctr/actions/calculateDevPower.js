// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import calculateMovingDevUnits from "./calculateMovingDevUnits.js";
import calculateTouchWipLimits from "./calculateTouchWipLimits.js";
import calculateTouchSteps from "./calculateTouchSteps.js";
//------------------------------------------------------------------
// calculateDevPower()
//------------------------------------------------------------------
export const calculateDevPower = (
  wipThisStep /*: number */,
  devUnits /*: number */,
) /*: number */ => {
  const touchSteps = calculateTouchSteps();
  const devUnitsTotal = calculateMovingDevUnits();
  const devUnitsPerTouchStep = devUnits / touchSteps;
  const touchWipAtStart = calculateTouchWipLimits();
  const wipPerTouchStep = touchWipAtStart / touchSteps;
  const devPowerPerDevUnitPerFlwItemPerTouchStep =
    wipPerTouchStep / devUnitsPerTouchStep;
  let devPower =
    devPowerPerDevUnitPerFlwItemPerTouchStep * gSttngs().get("devPowerFix");
  // If there are no WIP limits, devPower will be 0, so we fall back
  // to a straight calculation of devPower for this step
  if (devPower === 0) {
    devPower = 1;
  }
  return devPower;
};
export default calculateDevPower;
