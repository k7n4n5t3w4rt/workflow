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
  const xCm = gSettings().xCm;
  const yCm = gSettings().yCm;
  const zCm = gSettings().zCm;

  // Cubes in a group can be rotated / scaled etc as a group
  // const clickCubeGroup = new THREE.Group();

  const cellColour = 255;
  const geometry = new THREE.BoxGeometry(xCm, yCm, zCm);

  const material = new THREE.MeshBasicMaterial({
    color: `rgb(${cellColour},${cellColour},${cellColour})`,
  });
  const cube = new THREE.Mesh(geometry, material);

  cube.position.z = zCm;
  cube.position.y = yCm;
  cube.bubble_value = cellColour;
  cube.castShadow = true;
  return cube;
};
