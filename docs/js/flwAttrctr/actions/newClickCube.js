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
  const x = gSttngs().get("x");
  const y = gSttngs().get("y");
  const z = gSttngs().get("z");
  const geometry = new THREE.BoxGeometry(x, y, z);
  const material = new THREE.MeshLambertMaterial({
    color: `rgb(135,206,235)`,
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.z = gSttngs().get("z");
  cube.position.y = gSttngs().get("y");
  cube.castShadow = true;
  cube.receiveShadow = true;
  cube.material.opacity = 0.9;
  return cube;
};
