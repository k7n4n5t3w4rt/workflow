// @flow
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
//------------------------------------------------------------------
// IMPORT: GLOBALS
import expdtIsOn from "./expdtIsOn.js";
import gState from "./gState.js";
import gSttngs from "./gSttngs.js";
import setFlowItemColor from "./setFlowItemColor.js";
//------------------------------------------------------------------
// expediteNewFlwItems();
//------------------------------------------------------------------
export default (flwMpStpItems /*: FlwItem[] */) => {
  // `reverse()` a new array to preserve the real order of`flwStpItems`
  [...flwMpStpItems].reverse().forEach((flwItem /*: FlwItem */) => {
    if (
      expdtIsOn() &&
      gState().get("expdtCount") < gSttngs().get("expdtQueueLength") &&
      flwItem.dExpedite === false
    ) {
      flwItem.dExpedite = true;
      flwItem.name = "EXP-" + flwItem.name.split("-")[0];
      // Increment the global counter
      gState().set("expdtCount", gState().get("expdtCount") + 1);
      // Change the color of the item to green
      let color = gSttngs().get("colorGreen");
      setFlowItemColor(flwItem, color);
    }
  });
};
