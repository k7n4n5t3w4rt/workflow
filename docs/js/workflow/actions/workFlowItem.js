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
import global from "rollup-plugin-node-polyfills/polyfills/global";
// --------------------------------------------------
// HELPERS
// --------------------------------------------------

export default () /*: Object */ => {
  // Cubes in a group can be rotated / scaled etc as a group
  // const workFlowItemsGroup = new THREE.Group();
  const cellColour = 255;
  const geometry = new THREE.BoxGeometry(
    globalSettings().xCm,
    globalSettings().yCm,
    globalSettings().zCm,
  );

  const material = new THREE.MeshBasicMaterial({
    color: `rgb(${cellColour},${cellColour},${cellColour})`,
  });
  const cube = new THREE.Mesh(geometry, material);

  const nextCubeId = globalState().cubes.workFlowItems.length;
  cube.position.setFromMatrixPosition(
    globalState().sceneData.reticleStuff.reticle.matrix,
  );
  cube.position.y = globalSettings().yCm * 2;
  cube.position.z = cube.position.z + nextCubeId * -0.2;
  cube.bubble_value = cellColour;
  cube.castShadow = true;
  globalState().cubes.workFlowItems.push(cube);
  return cube;
};
