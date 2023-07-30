// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import touchStepsCount from "./touchStepsCount.js";
import calculateDevUnits from "./calculateDevUnits.js";
import calculateTotalWipLimits from "./calculateTotalWipLimits.js";
import calculateTouchWipLimits from "./calculateTouchWipLimits.js";
import calculateTouchSteps from "./calculateTouchSteps.js";
import calculateWaitSteps from "./calculateWaitSteps.js";
//-----
//------------------------------------------------------------------
// calculateDevPower()
//------------------------------------------------------------------
export default () /*: number */ => {
  // const avrgFlwTimePerItem = gSttngs().get("avrgFlwTimeAtStart");
  const touchSteps = calculateTouchSteps();
  //const flwTimePerItemPerTouchStep = avrgFlwTimePerItem / touchSteps;
  const devUnits = calculateDevUnits();
  const devUnitsPerTouchStep = devUnits / touchSteps;
  const touchWipAtStart = gSttngs().get("touchWipAtStart");
  const wipPerTouchStep = touchWipAtStart / touchSteps;
  const devPowerPerDevUnitPerFlwItemPerTouchStep =
    wipPerTouchStep / devUnitsPerTouchStep;
  const devPower =
    devPowerPerDevUnitPerFlwItemPerTouchStep * gSttngs().get("devPowerFix");
  return devPower;
};
