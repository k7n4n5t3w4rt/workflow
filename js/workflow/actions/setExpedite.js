// @flow
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import getFlwMpSteps from "./getFlwMpSteps.js";
import countExpeditedFlwItems from "./countExpeditedFlwItems.js";

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

//------------------------------------------------------------------
// addNewExpeditedFlwItems();
//------------------------------------------------------------------
const addNewExpeditedFlwItems = (
  flwMpStpItems /*: FlwItem[] */,
) /*: void */ => {
  const flwMpStpItmsCopy = [...flwMpStpItems].reverse();
  flwMpStpItmsCopy.forEach((flwItem /*: FlwItem */) => {
    if (
      gSttngs().expdtLimit > 0 &&
      gState().expdtCount < gSttngs().expdtLimit &&
      flwItem.dExpedite === false
    ) {
      flwItem.dExpedite = true;
      gState().expdtCount += 1;
      // Change the color of the item to green
      let color = new THREE.Color("green");
      flwItem.material.color.copy(color);
      flwItem.material.needsUpdate = true;
    }
  });
};
