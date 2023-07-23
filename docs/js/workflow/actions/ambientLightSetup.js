// @flow
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
//------------------------------------------------------------------
// ambientLightSetup()
//------------------------------------------------------------------
export const ambientLightSetup = () /*: Object */ => {
  // https://threejs.org/docs/#api/en/lights/AmbientLight
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  return ambientLight;
};
export default ambientLightSetup;
