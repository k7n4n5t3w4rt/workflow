// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs";
import gState from "./gState";
//------------------------------------------------------------------
// calculateTotalWip()
//------------------------------------------------------------------
export const calculateTotalWip = () /*: number */ => {
  const steps = gSttngs().get("steps");
  const flwMap = gState().get("flwMap");
  if (steps === undefined || flwMap === undefined) {
    return 0;
  }
  return steps.reduce((totalWip, step, index) => {
    if (step.status === "touch" || step.status === "wait") {
      const stepWip = flwMap[index] ? flwMap[index].length : 0;
      return totalWip + stepWip;
    }
    return totalWip;
  }, 0);
};
export default calculateTotalWip;
