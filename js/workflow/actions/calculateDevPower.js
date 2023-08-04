// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import calculateDevUnits from "./calculateDevUnits.js";
import calculateTouchWipLimits from "./calculateTouchWipLimits.js";
import calculateTouchSteps from "./calculateTouchSteps.js";
//------------------------------------------------------------------
// calculateDevPower()
//------------------------------------------------------------------
export const calculateDevPower = () /*: number */ => {
  // const avrgFlwTimePerItem = gSttngs().get("avrgFlwTimeAtStart");
  const touchSteps = calculateTouchSteps();
  //const flwTimePerItemPerTouchStep = avrgFlwTimePerItem / touchSteps;
  const devUnits = calculateDevUnits();
  const devUnitsPerTouchStep = devUnits / touchSteps;
  const touchWipAtStart = calculateTouchWipLimits();
  const wipPerTouchStep = touchWipAtStart / touchSteps;
  const devPowerPerDevUnitPerFlwItemPerTouchStep =
    wipPerTouchStep / devUnitsPerTouchStep;
  const devPower =
    devPowerPerDevUnitPerFlwItemPerTouchStep * gSttngs().get("devPowerFix");
  return devPower;
};
export default calculateDevPower;
