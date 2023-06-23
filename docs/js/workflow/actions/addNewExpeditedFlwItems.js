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
      gSttngs().expdtLimit > 0 &&
      gState().expdtCount < gSttngs().expdtLimit &&
      flwItem.dExpedite === false
    ) {
      flwItem.dExpedite = true;
      gState().expdtCount += 1;
      const stpStatus = gSttngs().steps[flwItem.dStpIndex].status;
      // If this flwItem is in the backlog, don't update it
      let color = gSttngs().colorGrey;
      if (stpStatus === "touch") {
        color = gSttngs().colorGreen;
      }
      // Change the color of the item to green
      let colorObject = new THREE.Color(color);
      flwItem.material.color.copy(colorObject);
      flwItem.material.needsUpdate = true;
    }
  });
};
