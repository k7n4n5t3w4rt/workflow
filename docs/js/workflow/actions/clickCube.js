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
  // Cubes in a group can be rotated / scaled etc as a group
  // const clickCubeGroup = new THREE.Group();

  const geometry = new THREE.BoxGeometry(
    gSettings().x,
    gSettings().y,
    gSettings().z,
  );

  const material = new THREE.MeshBasicMaterial({
    color: `rgb(255,255,255)`,
  });
  const cube = new THREE.Mesh(geometry, material);

  cube.position.z = gSettings().z;
  cube.position.y = gSettings().y;
  cube.castShadow = true;
  return cube;
};
