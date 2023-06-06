// @flow
// --------------------------------------------------
// THREE.js
// --------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
// --------------------------------------------------
// GLOBALS
// --------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import click from "./click.js";
import move from "./move.js";
import initializeHitTestSource from "./initializeHitTestSource.js";
import anime from "../../../web_modules/animejs.js";

export default () /*: () => Promise<any>  */ => {
  return async (timestamp, frame) /*: Promise<any> */ => {
    const sceneData = gState().sceneData;

    if (frame) {
      // 1. create a hit test source once and keep it for all the frames
      // this gets called only once
      // Could I move this to animate()?
      if (!sceneData.reticleStuff.hitTestSourceInitialized) {
        await initializeHitTestSource();
      }

      if (sceneData.reticleStuff.active) {
        // 2. get hit test results
        if (sceneData.reticleStuff.hitTestSourceInitialized) {
          // we get the hit test results for a particular frame
          const hitTestResults = frame.getHitTestResults(
            sceneData.reticleStuff.hitTestSource,
          );

          // XRHitTestResults The hit test may find multiple surfaces. The first one in the array is the one closest to the camera.
          if (hitTestResults.length > 0) {
            const hit = hitTestResults[0];
            // Get a pose from the hit test result. The pose represents the pose of a point on a surface.
            const pose = hit.getPose(sceneData.reticleStuff.localSpace);

            sceneData.reticleStuff.reticle.visible = true;
            // Transform/move the reticle image to the hit test position
            sceneData.reticleStuff.reticle.matrix.fromArray(
              pose.transform.matrix,
            );
          } else {
            sceneData.reticleStuff.reticle.visible = false;
          }
        }
      } else {
        sceneData.reticleStuff.reticle.visible = false;
        // -------------------------------------
        // Weirdly, this kills the rendering
        // -------------------------------------
        // reticleStuff.hitTestSourceInitialized = false;
        // reticleStuff.hitTestSource = null;
      }

      // if (cubes.active === true) {
      // }
      sceneData.stats.update();
      sceneData.renderer.render(sceneData.scene, sceneData.camera);
    }
  };
};
