// @flow
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import getFlwMpSteps from "./getFlwMpSteps.js";
import countExpeditedFlwItems from "./countExpeditedFlwItems.js";
import addNewExpeditedFlwItems from "./addNewExpeditedFlwItems.js";

//------------------------------------------------------------------
// setExpedite(flwItem)
//------------------------------------------------------------------
export default () => {
  // First, decrement gState().expedite to cover all the expedite items
  const flwMpSteps = getFlwMpSteps();
  gState().expdtCount = 0;
  flwMpSteps.forEach((flwMpStpItems /*: FlwItem[] */) /*: void */ => {
    countExpeditedFlwItems(flwMpStpItems);
  });
  // Then, set the expedite flag on some new items to make up the difference
  flwMpSteps.forEach((flwMpStpItems /*: FlwItem[] */) => {
    addNewExpeditedFlwItems(flwMpStpItems);
  });
};
