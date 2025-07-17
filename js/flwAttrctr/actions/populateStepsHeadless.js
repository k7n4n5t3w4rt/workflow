// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import getFlwMpSteps from "./getFlwMpSteps.js";
import newFlwItemHeadless from "./newFlwItemHeadless.js";
import newStepLabel from "./newStepLabel.js";
import newStepMetrics from "./newStepMetrics.js";
import expediteNewFlwItems from "./expediteNewFlwItems.js";

//------------------------------------------------------------------
// populateSteps()
//------------------------------------------------------------------
export const populateStepsHeadless = () /*: void */ => {
  const flwMpSteps = getFlwMpSteps();
  const steps = gSttngs().get("steps") || [];
  if (
    flwMpSteps.length === 0 ||
    steps.length === 0 ||
    flwMpSteps.length !== steps.length
  ) {
    setTimeout(populateStepsHeadless, 1000);
    return;
  }
  flwMpSteps.forEach((flwMpStep /*: Array<FlwItem> */, index /*: number */) => {
    if (steps[index] !== undefined && steps[index].limit !== undefined) {
      for (let i = 1; i <= steps[index].limit; i++) {
        if (steps[index].status !== "done") {
          newFlwItemHeadless(index);
        }
      }
    }
  });
};
export default populateStepsHeadless;
// Type definition for populateStepsHeadless
export type PopulateStepsHeadlessType = () => void;
