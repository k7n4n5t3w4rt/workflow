// @flow
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
import * as THREE from "three";
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// FUNCTION" newVSphere()
//------------------------------------------------------------------
export const newVSphere = async () /*: Promise<Object> */ => {
  // Create a texture loader
  // How to use it
  const textureMap = await new THREE.TextureLoader()
    .loadAsync("../../../img/assets/textures/gold_7.jpg")
    .catch((err) => {
      console.log(err);
    });
  const material = new THREE.MeshLambertMaterial({
    // color: 0xc1c1c1,
    map: textureMap,
    side: THREE.FrontSide,
  });
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const sphere = new THREE.Mesh(geometry, material);
  sphere.receiveShadow = true;
  sphere.castShadow = true;
  sphere.visible = false;
  sphere.position.x = gState().get("endPosition").x;
  sphere.position.y = gState().get("endPosition").y;
  sphere.position.z = gState().get("endPosition").z;
  sphere.dPosition = sphere.position.clone();
  sphere.material.opacity = 0.9;
  sphere.scale.set(0, 0, 0);
  return sphere;
};
export default newVSphere;
