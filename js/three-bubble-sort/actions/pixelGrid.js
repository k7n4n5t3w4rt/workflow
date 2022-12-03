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
) /*: {pixelGridGroup:Object, pixelGridCubes:Array<Cube>} */ => {
  const xCm /*: number */ = scaleXm / 100;
  const yCm /*: number */ = scaleYm / 100;
  const zCm /*: number */ = scaleZm / 100;
  //create a group and add the two cubes
  //These cubes can now be rotated / scaled etc as a group
  const pixelGridGroup = new THREE.Group();

  const pixelGridCubes /*: Array<Cube> */ = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 5; j++) {
      const cellColour = 255 - Math.ceil(255 * Math.random());
      const geometry = new THREE.BoxGeometry(xCm, yCm, zCm);

      const material = new THREE.MeshBasicMaterial({
        color: `rgb(${cellColour},${cellColour},${cellColour})`,
      });
      const cube = new THREE.Mesh(geometry, material);

      cube.position.z = j * zCm;
      cube.position.y = i * yCm;
      cube.bubble_value = cellColour;
      cube.castShadow = true;
      pixelGridGroup.add(cube);
      pixelGridCubes.push(cube);
    }
  }
  scene.add(pixelGridGroup);
  return { pixelGridGroup, pixelGridCubes };
};
