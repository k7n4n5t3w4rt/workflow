// @flow
// Utility to depopulate steps by unsetting flwMap
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import getFlwMpSteps from "./getFlwMpSteps.js";

export default function depopulateSteps() {
  const flwMpSteps = getFlwMpSteps();
  const steps = gSttngs().get("steps") || [];
  flwMpSteps.forEach((flwMpStep /*: Array<FlwItem> */, index /*: number */) => {
    if (steps[index] !== undefined && steps[index].limit !== undefined) {
      for (let i = 1; i <= steps[index].limit; i++) {
        // console.log(
        //   `depopulateSteps: This is where we might think about removing items from the lwMpStep. `,
        // );
      }
    }
  });
}
