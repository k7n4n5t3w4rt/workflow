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

export const autoMoveDevUnits = () => {
  const steps = gSttngs().get("steps");
  const flwMap = gState().get("flwMap");
  const totalDevUnits = calculateDevUnits();

  // Get all "touch" steps and their WIP
  const touchSteps = steps
    .map((step, index) => ({
      index,
      wip: flwMap[index] ? flwMap[index].length : 0,
    }))
    .filter((step) => steps[step.index].status === "touch");

  // Calculate total WIP across all "touch" steps
  const totalWip = touchSteps.reduce((sum, step) => sum + step.wip, 0);

  // If there's no WIP, do nothing
  if (totalWip === 0) {
    return;
  }

  // Allocate DevUnits proportionally
  touchSteps.forEach((step) => {
    const proportion = step.wip / totalWip;
    const allocatedDevUnits = Math.round(totalDevUnits * proportion);
    steps[step.index].movingDevUnits = allocatedDevUnits;
  });

  // Set non-touch steps to 0
  steps.forEach((step) => {
    if (step.status !== "touch") {
      step.movingDevUnits = 0;
    }
  });

  gSttngs().set("steps", steps);
};

export default autoMoveDevUnits;
