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
import expediteNewFlwItems from "./expediteNewFlwItems.js";

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
  // Expedite new items until the `expdtCount` reaches the `expdtLimit`
  flwMpSteps.forEach((flwMpStpItems /*: FlwItem[] */) /*: void */ => {
    expediteNewFlwItems(flwMpStpItems);
  });
};
