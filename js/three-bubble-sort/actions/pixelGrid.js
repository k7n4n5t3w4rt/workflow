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
  scene /*: Object */,
  reticleStuff /*: Object */,
) /*: Object */ => {
  const xCm /*: number */ = scaleXm / 100;
  const yCm /*: number */ = scaleYm / 100;
  const zCm /*: number */ = scaleZm / 100;
  // Cubes in a group can be rotated / scaled etc as a group
  const pixelGridGroup = new THREE.Group();

  const pixelGridCubes /*: Array<Cube> */ = [];
  const cellColour = 255 - Math.ceil(255 * Math.random());
  const geometry = new THREE.BoxGeometry(xCm, yCm, zCm);

  const material = new THREE.MeshBasicMaterial({
    color: `rgb(${cellColour},${cellColour},${cellColour})`,
  });
  const cube = new THREE.Mesh(geometry, material);

  cube.position.z = zCm;
  cube.position.y = yCm;
  cube.bubble_value = cellColour;
  cube.castShadow = true;
  pixelGridGroup.add(cube);
  pixelGridCubes.push(cube);
  scene.add(pixelGridGroup);
  return pixelGridGroup;
};
