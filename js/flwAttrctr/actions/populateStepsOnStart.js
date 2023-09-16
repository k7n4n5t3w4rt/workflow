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
import newFlwItem from "./newFlwItem.js";
import newStepLabel from "./newStepLabel.js";
import newStepMetrics from "./newStepMetrics.js";
import expediteNewFlwItems from "./expediteNewFlwItems.js";

//------------------------------------------------------------------
// populateSteps()
//------------------------------------------------------------------
export const populateStepsOnStart = () /*: void */ => {
  const flwMpSteps = getFlwMpSteps();
  const steps = gSttngs().get("steps") || [];
  if (
    flwMpSteps.length === 0 ||
    steps.length === 0 ||
    flwMpSteps.length !== steps.length
  ) {
    setTimeout(populateStepsOnStart, 1000);
    return;
  }
  flwMpSteps.forEach((flwMpStep /*: Array<FlwItem> */, index /*: number */) => {
    if (steps[index] !== undefined && steps[index].limit !== undefined) {
      if (steps[index].status !== "done") {
        newStepLabel(index);
        newStepMetrics(index, [
          { key: "Limit", value: steps[index].limit.toString() },
          { key: "AvAg", value: "0" },
          { key: "DvUnts", value: "0" },
        ]);
      } else {
        // Set up the overall flow metrics over the Done step
      }
      for (let i = 1; i <= steps[index].limit; i++) {
        if (steps[index].status !== "done") {
          newFlwItem(index);
        }
      }
    }
  });
};
export default populateStepsOnStart;
