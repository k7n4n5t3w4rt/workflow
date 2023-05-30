// @flow
// --------------------------------------------------
// THREE.js
// --------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
// --------------------------------------------------
// GLOBALS
// --------------------------------------------------
import globalSettings from "./globalSettings.js";
import globalState from "./globalState.js";

export default () /*: Object */ => {
  const xCm = globalSettings().xCm;
  const yCm = globalSettings().yCm;
  const zCm = globalSettings().zCm;

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
