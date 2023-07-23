import * as THREE from "../../../web_modules/three.js";

//------------------------------------------------------------------
// hemisphereLightSetup()
//------------------------------------------------------------------
const hemisphereLightSetup = () => {
  // https://threejs.org/docs/#api/en/lights/HemisphereLight
  const hemisphereLight = new THREE.HemisphereLight(16777215, 16777215, 200);
  hemisphereLight.position.set(0, 50, 0);
  return hemisphereLight;
};
