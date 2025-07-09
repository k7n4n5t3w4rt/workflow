// @flow
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gState from "./gState";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import getFlwMpSteps from "./getFlwMpSteps";
import countExpeditedFlwItems from "./countExpeditedFlwItems";
import expediteNewFlwItems from "./expediteNewFlwItems";

//------------------------------------------------------------------
// setExpedite(flwItem)
//------------------------------------------------------------------
export default () => {
  const flwMpSteps = getFlwMpSteps();
  let expdtCount = flwMpSteps.reduce(
    (expdtCount, flwMpStpItems /*: FlwItem[] */) => {
      return expdtCount + countExpeditedFlwItems(flwMpStpItems);
    },
    0,
  );
  // Update the `expdtCount`, used in `expediteNewFlwItems()`
  gState().set("expdtCount", expdtCount);
  // Expedite new items until the `expdtCount` reaches the `expdtQueueLength`
  flwMpSteps.forEach((flwMpStpItems /*: FlwItem[] */) /*: void */ => {
    expediteNewFlwItems(flwMpStpItems);
  });
};
