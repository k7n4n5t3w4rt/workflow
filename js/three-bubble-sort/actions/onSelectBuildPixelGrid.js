// @flow
// --------------------------------------------------
// THREE.js
// --------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import pixelGrid from "./pixelGrid.js";

export default (
  reticleStuff /*: ReticleStuff */,
  cubes /*: Cubes */,
  xCm /*: number */,
  yCm /*: number */,
  zCm /*: number */,
  scene /*: Object */,
  camera /*: Object */,
) /*: () => void */ => () /*: void */ => {
  if (reticleStuff.reticle.visible) {
    reticleStuff.active = false;
  }

  if (cubes.active === undefined || cubes.active === false) {
    // Build the grid of pixels
    cubes.pixelGridGroup = pixelGrid(xCm, yCm, zCm, scene, reticleStuff);
    cubes.active = true;

    // console.log("cubes = ", JSON.stringify(cubes));

    // Get the direction in which the camera is looking
    const vector = new THREE.Vector3();
    camera.getWorldDirection(vector);
    const radians = Math.atan2(vector.x, vector.z);
    // Rotate the group on the Y axis (around it's centre, always the 0,0,0 point)
    cubes.pixelGridGroup.rotateY(radians);
    // Last thing: set the position of the cube based on the location of  the reticle
    cubes.pixelGridGroup.position.setFromMatrixPosition(
      reticleStuff.reticle.matrix,
    );
  }
};
