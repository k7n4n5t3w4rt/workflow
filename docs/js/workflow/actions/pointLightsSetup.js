// @flow
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
//------------------------------------------------------------------
// pointLightsSetup()
//------------------------------------------------------------------
export const pointLightsSetup =
  () /*: { pointLight1: Object, pointLight2: Object, pointLight3: Object, r: number } */ => {
    // https://threejs.org/docs/#api/en/lights/PointLight
    // const pointLight = new THREE.PointLight(0xff0000, 1, 100);
    // pointLight.position.set(0.5, 1, 0.25);
    // pointLight.castShadow = true;
    // pointLight.shadow.camera.near = 0.1;
    // pointLight.shadow.camera.far = 25;
    const pointLight1 = new THREE.PointLight(0xffd700, 1.5, 0, 0);
    pointLight1.position.z = 2500;
    const pointLight2 = new THREE.PointLight(0xffd700, 3, 0, 0);
    const pointLight3 = new THREE.PointLight(0xffd700, 1.5, 0, 0);
    pointLight3.position.x = -1000;
    pointLight3.position.z = 1000;
    return { pointLight1, pointLight2, pointLight3, r: 0 };
  };
export default pointLightsSetup;
