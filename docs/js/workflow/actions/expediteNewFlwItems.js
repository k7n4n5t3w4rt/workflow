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
// expediteNewFlwItems();
//------------------------------------------------------------------
export default (flwMpStpItems /*: FlwItem[] */) => {
  [...flwMpStpItems].reverse().forEach((flwItem /*: FlwItem */) => {
    if (
      gSttngs().get("expdtLimit") > 0 &&
      gState().get("expdtCount") < gSttngs().get("expdtLimit") &&
      flwItem.dExpedite === false
    ) {
      flwItem.dExpedite = true;
      flwItem.name = "EXP-" + flwItem.name;
      // Increment the global counter
      gState().set("expdtCount", gState().get("expdtCount") + 1);
      // Change the color of the item to green
      let color = gSttngs().get("colorGreen");
      let colorObject = new THREE.Color(color);
      flwItem.material.color.copy(colorObject);
      flwItem.material.needsUpdate = true;
    }
  });
};
