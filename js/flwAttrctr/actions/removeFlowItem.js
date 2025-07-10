// @flow
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
import * as THREE from "three";
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import animateScaleToZero from "./animateScaleToZero.js";
//------------------------------------------------------------------
// FUNCTION: removeFlowItem()
//------------------------------------------------------------------
export const removeFlowItem = (flwItem /*: FlwItem */) /*: void */ => {
  if (flwItem.dMoving) {
    return;
  }
  let theActualMeshObject = gState()
    .get("scnData")
    .scene.getObjectByName(flwItem.name);
  if (theActualMeshObject !== undefined) {
    //
    animateScaleToZero(flwItem, 300, removeThreeObject(theActualMeshObject));
  } else {
    // Just in case this is still happening and we really couldn't find
    // the actual mesh object, make it red so we can see it
    let colorObject = { color: "#FF0000" };
    let color = new THREE.Color(colorObject.color);
    flwItem.material.color.copy(color);
    flwItem.material.needsUpdate = true;
  }
};
export default removeFlowItem;
//------------------------------------------------------------------
// removeThreeObject()
//------------------------------------------------------------------
const removeThreeObject = (flwItem /*: FlwItem */) => () => {
  // For better memory management and performance...
  if (flwItem.geometry) flwItem.geometry.dispose();
  if (flwItem.material) {
    if (flwItem.material instanceof Array) {
      flwItem.material.forEach((material) => material.dispose());
    } else {
      flwItem.material.dispose();
    }
  }
  // The parent might be the scene or another Object3D, but it
  // is sure to be removed this way
  flwItem.removeFromParent();
};
