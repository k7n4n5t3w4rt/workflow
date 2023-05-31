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
// --------------------------------------------------
// HELPERS
// --------------------------------------------------

export default () /*: Object */ => {
  // Cubes in a group can be rotated / scaled etc as a group
  // const workFlowItemsGroup = new THREE.Group();
  const cellColour = 255;
  const geometry = new THREE.BoxGeometry(
    gSettings().xCm,
    gSettings().yCm,
    gSettings().zCm,
  );

  const material = new THREE.MeshBasicMaterial({
    color: `rgb(${cellColour},${cellColour},${cellColour})`,
  });
  const cube = new THREE.Mesh(geometry, material);

  const nextCubeId = gState().cubes.workFlowItems.length;
  cube.position.setFromMatrixPosition(
    gState().sceneData.reticleStuff.reticle.matrix,
  );
  cube.position.y = gSettings().yCm * 2;
  cube.position.z = cube.position.z + nextCubeId * -0.2;
  cube.bubble_value = cellColour;
  cube.castShadow = true;
  gState().cubes.workFlowItems.push(cube);
  return cube;
};
