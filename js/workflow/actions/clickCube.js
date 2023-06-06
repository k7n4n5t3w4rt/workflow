// @flow
// --------------------------------------------------
// THREE.js
// --------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
// --------------------------------------------------
// GLOBALS
// --------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";

export default () /*: Object */ => {
  // Cubes in a group can be rotated / scaled etc as a group
  const clickCubeGroup = new THREE.Group();

  const geometry = new THREE.BoxGeometry(gSttngs().x, gSttngs().y, gSttngs().z);

  const material = new THREE.MeshBasicMaterial({
    color: `rgb(135,206,235)`,
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.z = gSttngs().z;
  cube.position.y = gSttngs().y;
  cube.castShadow = true;
  cube.receiveShadow = true;
  // Add the cube to the group (and the THREE.js scene)
  clickCubeGroup.add(cube);
  // ..also add the cube to the group object so we can access it later
  clickCubeGroup.clickCube = cube;

  return clickCubeGroup;
};
