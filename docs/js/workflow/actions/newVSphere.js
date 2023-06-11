// @flow
// --------------------------------------------------
// THREE.js
// --------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
// --------------------------------------------------
// GLOBALS
// --------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";

export default () /*: Object */ => {
  // spheres in a group can be rotated / scaled etc as a group
  // const clicksphereGroup = new THREE.Group();
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshBasicMaterial({
    color: `rgb(218,165,32)`,
  });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.castShadow = true;
  sphere.visible = false;
  sphere.dPosition = sphere.position.clone();
  return sphere;
};
