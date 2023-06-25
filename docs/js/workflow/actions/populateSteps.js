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
import countExpeditedFlwItems from "./countExpeditedFlwItems.js";
import addNewExpeditedFlwItems from "./addNewExpeditedFlwItems.js";

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
  gState().set("expdtCount", 0);
  flwMpSteps.forEach((flwMpStpItems /*: FlwItem[] */) /*: void */ => {
    countExpeditedFlwItems(flwMpStpItems);
  });
  // Then, set the expedite flag on some new items to make up the difference
  flwMpSteps.reverse().forEach((flwMpStpItems /*: FlwItem[] */) => {
    addNewExpeditedFlwItems(flwMpStpItems);
  });
};
