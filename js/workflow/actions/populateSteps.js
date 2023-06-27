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
export default () /*: void */ => {
  const flwMpSteps = getFlwMpSteps();
  flwMpSteps.forEach((flwMpStep /*: Array<FlwItem> */, index /*: number */) => {
    for (let i = 0; i <= gSttngs().get("steps")[index].preload - 1; i++) {
      newFlwItem(index);
    }
  });
};
