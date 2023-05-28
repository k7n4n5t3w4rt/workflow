// @flow
// --------------------------------------------------
// THREE.js
// --------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import pixelGridGroup from "./pixelGridGroup.js";
import clickCubeGroup from "./clickCube.js";
import click from "./click.js";
import anime from "../../../web_modules/animejs.js";

export default (
    reticleStuff /*: ReticleStuff */,
    cubes /*: Cubes */,
    xCm /*: number */,
    yCm /*: number */,
    zCm /*: number */,
    scene /*: Object */,
    camera /*: Object */,
  ) /*: () => void */ =>
  () /*: void */ => {
    if (reticleStuff.reticle.visible) {
      reticleStuff.active = false;
    }

    if (cubes.active === undefined || cubes.active === false) {
      // Build the grid of pixels
      cubes.clickCubeGroup = clickCubeGroup(xCm, yCm, zCm, scene);
      cubes.pixelGridGroup = pixelGridGroup(xCm, yCm, zCm, scene);
      cubes.active = true;

      // console.log("cubes = ", JSON.stringify(cubes));

      // Get the direction in which the camera is looking
      const vector = new THREE.Vector3();
      camera.getWorldDirection(vector);
      const radians = Math.atan2(vector.x, vector.z);
      // Rotate the group on the Y axis (around it's centre, always the 0,0,0 point)
      cubes.clickCubeGroup.rotateY(radians);
      cubes.pixelGridGroup.rotateY(radians);
      // Last thing: set the position of the cube based on the location of  the reticle
      cubes.clickCubeGroup.position.setFromMatrixPosition(
        reticleStuff.reticle.matrix,
      );
      cubes.pixelGridGroup.position.setFromMatrixPosition(
        reticleStuff.reticle.matrix,
      );
      cubes.pixelGridGroup.position.y = cubes.pixelGridGroup.position.y + 1;
    }

    click(cubes.clickCubeGroup.children[0], cubes.pixelGridGroup, anime);
  };
