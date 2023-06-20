// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import getFlwMpSteps from "./getFlwMpSteps.js";
import newFlwItem from "./newFlwItem.js";
//------------------------------------------------------------------
// populateSteps()
//------------------------------------------------------------------
export default () /*: void */ => {
  const flwMpSteps = getFlwMpSteps();
  flwMpSteps.forEach((flwMpStep /*: Array<FlwItem> */, index /*: number */) => {
    for (let i = 0; i <= gSttngs().steps[index].preload - 1; i++) {
      newFlwItem(index);
    }
  });
};
