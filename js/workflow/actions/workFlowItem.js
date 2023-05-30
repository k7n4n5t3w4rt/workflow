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
// --------------------------------------------------
// HELPERS
// --------------------------------------------------

export default () /*: Object */ => {
  // Cubes in a group can be rotated / scaled etc as a group
  // const pixelGridGroup = new THREE.Group();

  const cellColour = 255 - Math.ceil(255 * 0.5);
  const geometry = new THREE.BoxGeometry(
    globalSettings().xCm,
    globalSettings().yCm,
    globalSettings().zCm,
  );

  const material = new THREE.MeshBasicMaterial({
    color: `rgb(${cellColour},${cellColour},${cellColour})`,
  });
  const cube = new THREE.Mesh(geometry, material);

  // cube.id = globalState().cubes.workFlowItems.length;
  // globalState("lastId", cube.id);
  const cubes = globalState().cubes;
  const nextCubeId = cubes.workFlowItems.length;
  cube.position.x = globalSettings().xCm + nextCubeId * -0.1;
  cube.position.y = globalSettings().yCm + nextCubeId * -0.1;
  cube.position.z = globalSettings().zCm + nextCubeId * -0.1;
  cube.bubble_value = cellColour;
  cube.castShadow = true;
  cubes.workFlowItems.push(cube);
  return cube;
};
