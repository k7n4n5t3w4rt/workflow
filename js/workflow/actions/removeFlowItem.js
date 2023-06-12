// @flow
//------------------------------------------------------------------
// IMPORTS: GLOBALS
//------------------------------------------------------------------
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
import * as THREE from "../../../web_modules/three.js";

//------------------------------------------------------------------
// removeFlowItem()
//------------------------------------------------------------------
export default (flwItem /*: FlwItem */, index /*: number */) => {
  if (flwItem.dMoving) {
    return;
  }
  let theActualMeshObject = gState().scnData.scene.getObjectByName(
    flwItem.name,
  );
  if (theActualMeshObject !== undefined) {
    // console.log("The mesh object is defined.");
    removeThreeObject(theActualMeshObject);
  } else {
    // Just in case this is still happening and we really couldn't find
    // the actual mesh object, make it red so we can see it
    let colorObject = { color: "#FF0000" };
    let color = new THREE.Color(colorObject.color);
    flwItem.material.color.copy(color);
    flwItem.material.needsUpdate = true;
  }
  // Remove it from the flwMap
  const deletedFlwItem = gState().flwMap[
    flwItem.dFlwStpsIndex.toString()
  ].splice(index, 1);
};

//------------------------------------------------------------------
// removeThreeObject()
//------------------------------------------------------------------
const removeThreeObject = (flwItem /*: FlwItem */) /*: void */ => {
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
