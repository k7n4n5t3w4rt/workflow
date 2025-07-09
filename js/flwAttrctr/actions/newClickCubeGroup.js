// @flow
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
import * as THREE from "three";
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs";
import gState from "./gState";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import newClickCube from "./newClickCube";

export default () /*: Object */ => {
  // Cubes in a group can be rotated / scaled etc as a group
  const clckCbGroup = new THREE.Group();
  const cube = newClickCube();
  // Add the cube to the group (and the THREE.js scene)
  clckCbGroup.add(cube);
  // ..also add the cube to the group object so we can access it later
  clckCbGroup.clckCube = cube;
  return clckCbGroup;
};
