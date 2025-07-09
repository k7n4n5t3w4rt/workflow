// @flow
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
import * as THREE from "three";
//------------------------------------------------------------------
// setFlowItemColor()
//------------------------------------------------------------------
export default (flwItem /*: FlwItem */, color /*: string */) /*: void */ => {
  let colorObject = new THREE.Color(color);
  flwItem.material.color.copy(colorObject);
  flwItem.material.needsUpdate = true;
};
