// @flow
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";

export default () /*: Object */ => {
  // Cubes in a group can be rotated / scaled etc as a group
  const clckCbGroup = new THREE.Group();

  const geometry = new THREE.BoxGeometry(
    gSttngs().get("x"),
    gSttngs().get("y"),
    gSttngs().get("z"),
  );

  const material = new THREE.MeshLambertMaterial({
    color: `rgb(135,206,235)`,
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.z = gSttngs().get("z");
  cube.position.y = gSttngs().get("y");
  cube.castShadow = true;
  cube.receiveShadow = true;
  cube.material.opacity = 0.9;
  // Add the cube to the group (and the THREE.js scene)
  clckCbGroup.add(cube);
  // ..also add the cube to the group object so we can access it later
  clckCbGroup.clckCube = cube;

  return clckCbGroup;
};
