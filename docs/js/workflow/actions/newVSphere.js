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

export default async () /*: Object */ => {
  // Create a texture loader
  // How to use it
  const textureMap = await new THREE.TextureLoader()
    .loadAsync("../../../img/assets/textures/gold_7.jpg")
    .catch((err) => {
      console.log(err);
    });
  // const normalMap = await new THREE.TextureLoader()
  //   .loadAsync(
  //     "../../../img/assets/textures/gold/MetalGoldPaint002_NRM_2K_METALNESS.png",
  //   )
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // const displacementMap = await new THREE.TextureLoader()
  //   .loadAsync(
  //     "../../../img/assets/textures/gold/MetalGoldPaint002_DISP_2K_METALNESS.png",
  //   )
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // // env map

  // const path = "https://threejs.org/examples/textures/cube/SwedishRoyalCastle/";
  // const format = ".jpg";
  // const urls = [
  //   path + "px" + format,
  //   path + "nx" + format,
  //   path + "py" + format,
  //   path + "ny" + format,
  //   path + "pz" + format,
  //   path + "nz" + format,
  // ];

  // const reflectionCube = new THREE.CubeTextureLoader().load(
  //   urls,
  //   undefined,
  //   (error) => console.error(error),
  // );
  const material = new THREE.MeshLambertMaterial({
    // color: 0xc1c1c1,
    map: textureMap,
    // roughness: 0.06,
    // metalness: 1,
    // // normalMap: normalMap,
    // // normalScale: new THREE.Vector2(1, -1), // why does the normal map require negation in this case?
    // // aoMap: aoMap,
    // // aoMapIntensity: 1,
    // displacementMap: displacementMap,
    // displacementScale: 2.43614,
    // displacementBias: -0.428408, // from original model
    // envMap: reflectionCube,
    // envMapIntensity: 7,
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
  return sphere;
};
