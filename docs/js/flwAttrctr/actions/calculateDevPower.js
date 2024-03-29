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
export const calculateDevPower = () /*: number */ => {
  const touchSteps = calculateTouchSteps();
  const devUnitsTotal = calculateMovingDevUnits();
  const devUnitsPerTouchStep = devUnitsTotal / touchSteps;
  const touchWipAtStart = calculateTouchWipLimits();
  const wipPerTouchStep = touchWipAtStart / touchSteps;
  let devPowerPerDevUnitPerFlwItemPerTouchStep =
    wipPerTouchStep / devUnitsPerTouchStep;
  // If there are no WIP limits, devPower will be 0, so we fall back
  // to a straight calculation of devPower for this step
  if (devPowerPerDevUnitPerFlwItemPerTouchStep === 0) {
    devPowerPerDevUnitPerFlwItemPerTouchStep = 1;
  }
  let devPower =
    devPowerPerDevUnitPerFlwItemPerTouchStep * gSttngs().get("devPowerFix");
  return devPower;
};
export default calculateDevPower;
