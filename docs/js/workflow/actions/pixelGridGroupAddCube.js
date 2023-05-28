// @flow
// --------------------------------------------------
// THREE.js
// --------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
// --------------------------------------------------
// HELPERS
// --------------------------------------------------

export default (pixelGridGroup /*: Object */) /*: Object */ => {
  const xCm /*: number */ = 100;
  const yCm /*: number */ = 100;
  const zCm /*: number */ = 100;

  const cellColour = 255 - Math.ceil(255 * 0.5);
  const geometry = new THREE.BoxGeometry(xCm, yCm, zCm);

  const material = new THREE.MeshBasicMaterial({
    color: `rgb(${cellColour},${cellColour},${cellColour})`,
  });
  const cube = new THREE.Mesh(geometry, material);

  cube.position.z = zCm + 10;
  cube.position.y = yCm;
  cube.bubble_value = cellColour;
  cube.castShadow = true;
  pixelGridGroup.add(cube);
  return pixelGridGroup;
};
