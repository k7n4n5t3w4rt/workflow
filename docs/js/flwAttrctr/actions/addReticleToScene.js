// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../actions/gSttngs.js";
import gState from "../actions/gState.js";
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
//------------------------------------------------------------------
// FUNCTION: addReticleToScene()
//------------------------------------------------------------------
export const addReticleToScene = (
  {
    scene,
    camera,
    renderer,
  } /*: {scene: Object, camera: Object, renderer: Object} */,
) /*: ReticleStuff */ => {
  const reticleStuff = {};
  // Set to active by default. It will be set to inactive
  // when the first object is added to the scene
  reticleStuff.active = true;
  // Make the reticle object
  const geometry = new THREE.RingBufferGeometry(0.15, 0.2, 32).rotateX(
    -Math.PI / 2,
  );
  const material = new THREE.MeshBasicMaterial();
  reticleStuff.reticle = new THREE.Mesh(geometry, material);
  const scale = gSttngs().get("scale");
  reticleStuff.reticle.scale.set(scale, scale, scale);
  reticleStuff.reticle.updateMatrix();
  // we will calculate the position and rotation of this reticle every frame manually
  // in the render() function so matrixAutoUpdate is set to false
  reticleStuff.reticle.matrixAutoUpdate = false;
  reticleStuff.reticle.visible = false; // we start with the reticle not visible
  scene.add(reticleStuff.reticle);
  // optional axis helper you can add to an object
  // reticle.add(new THREE.AxesHelper(1));
  return reticleStuff;
};
export default addReticleToScene;
