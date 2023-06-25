// @flow
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
//------------------------------------------------------------------
// IMPORT: GLOBALS
import gState from "./gState.js";
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// addNewExpeditedFlwItems();
//------------------------------------------------------------------
export default (flwMpStpItems /*: FlwItem[] */) => {
  const flwMpStpItmsCopy = [...flwMpStpItems].reverse();
  flwMpStpItmsCopy.forEach((flwItem /*: FlwItem */) => {
    if (
      gSttngs().get("expdtLimit") > 0 &&
      gState().get("expdtCount") < gSttngs().get("expdtLimit") &&
      flwItem.dExpedite === false
    ) {
      flwItem.dExpedite = true;
      gState().set("expdtCount", gState().get("expdtCount") + 1);
      const stpStatus = gSttngs().get("steps")[flwItem.dStpIndex].status;
      // If this flwItem is in the backlog, don't update it
      let color = gSttngs().get("colorGrey");
      if (stpStatus === "touch") {
        color = gSttngs().get("colorGreen");
      }
      // Change the color of the item to green
      let colorObject = new THREE.Color(color);
      flwItem.material.color.copy(colorObject);
      flwItem.material.needsUpdate = true;
    }
  });
};
