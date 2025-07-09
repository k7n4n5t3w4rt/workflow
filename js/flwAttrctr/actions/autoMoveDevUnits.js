// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs";
import gState from "./gState";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import calculateDevUnits from "./calculateDevUnits";
import calculateTotalWip from "./calculateTotalWip";

export const autoMoveDevUnits = () => {
  const steps = gSttngs().get("steps");
  const flwMap = gState().get("flwMap");
  const totalDevUnits = calculateDevUnits();
  const totalWip = calculateTotalWip();

  // If there's no WIP, do nothing
  if (totalWip === 0) {
    return;
  }

  // Get all "touch" steps and their WIP
  const touchSteps = steps
    .map((step, index) => {
      let wip = 0;
      if (flwMap[index]) {
        wip = flwMap[index].length;
      }
      // if the preceding step is a wait step, add its wip to this step's wip
      if (index > 0 && steps[index - 1].status === "wait") {
        if (flwMap[index - 1]) {
          wip += flwMap[index - 1].length;
        }
      }
      return {
        index,
        wip,
      };
    })
    .filter((step) => steps[step.index].status === "touch");

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
