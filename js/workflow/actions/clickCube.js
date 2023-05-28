// @flow
// --------------------------------------------------
// THREE.js
// --------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
// --------------------------------------------------
// HELPERS
// --------------------------------------------------

export default (
  scaleXm /*: number */,
  scaleYm /*: number */,
  scaleZm /*: number */,
) /*: Object */ => {
  const xCm /*: number */ = scaleXm / 100;
  const yCm /*: number */ = scaleYm / 100;
  const zCm /*: number */ = scaleZm / 100;
  // Cubes in a group can be rotated / scaled etc as a group
  const clickCubeGroup = new THREE.Group();

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
  clickCubeGroup.add(cube);
  return clickCubeGroup;
};
