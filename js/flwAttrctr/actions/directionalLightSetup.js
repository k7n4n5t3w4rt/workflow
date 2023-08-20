// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
//------------------------------------------------------------------
// directionalLightSetup()
//------------------------------------------------------------------
export const directionalLightSetup = () /*: Object */ => {
  // https://threejs.org/docs/#api/en/lights/DirectionalLight
  const intensity = 0.1;
  const directionalLight = new THREE.DirectionalLight(0xffffff, intensity);
  directionalLight.position.set(
    gState().get("endPosition").x,
    gState().get("endPosition").y + 10,
    gState().get("endPosition").z + 10,
  ); // set a position
  directionalLight.castShadow = true;
  directionalLight.target = gState().get("clickCube");
  return directionalLight;
};
export default directionalLightSetup;
