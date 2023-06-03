// @flow
// --------------------------------------------------
// THREE.js
// --------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
// --------------------------------------------------
// GLOBALS
// --------------------------------------------------
import gSettings from "./gSettings.js";
import gState from "./gState.js";

export default () /*: Object */ => {
  // spheres in a group can be rotated / scaled etc as a group
  // const clicksphereGroup = new THREE.Group();

  const geometry = new THREE.SphereGeometry(0.01, 32, 15);

  const material = new THREE.MeshBasicMaterial({
    color: `rgb(250,250,210)`,
  });
  const sphere = new THREE.Mesh(geometry, material);

  sphere.castShadow = true;
  return sphere;
};
