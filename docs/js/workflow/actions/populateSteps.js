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
import expediteNewFlwItems from "./expediteNewFlwItems.js";

//------------------------------------------------------------------
// populateSteps()
//------------------------------------------------------------------
export const populateSteps = () /*: void */ => {
  const flwMpSteps = getFlwMpSteps();
  const steps = gSttngs().get("steps") || [];
  if (flwMpSteps.length === 0 || steps.length === 0) {
    setTimeout(populateSteps, 1000);
    return;
  }
  flwMpSteps.forEach((flwMpStep /*: Array<FlwItem> */, index /*: number */) => {
    for (let i = 1; i <= steps[index].limit; i++) {
      if (steps[index].status !== "done") {
        newFlwItem(index);
      }
    }
  });
  console.log("Preload done.");
};
export default populateSteps;
