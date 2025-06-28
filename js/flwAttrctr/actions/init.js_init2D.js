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
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import { OrbitControls } from "../../../web_modules/three/examples/jsm/controls/OrbitControls.js";
import cameraSetup from "./init.js_cameraSetup.js";
import addReticleToScene from "./init.js_addReticleToScene.js";
import render from "./init.js_render.js";
import addArContainerToDom from "./init.js_addArContainerToDom.js";
import rendererSetup from "./init.js_rendererSetup.js";
import labelRendererSetup from "./init.js_labelRendererSetup.js";
import onWindowResize from "../actions/init.js_onWindowResize.js";
import start from "./start.js";

export const init2D = function (renderer /*: ThrRenderer */) /*: void */ {
  // Add or reuse the AR container
  const ARContainer = addArContainerToDom();
  // Debug: style the AR container to ensure visibility and sizing
  ARContainer.style.display = "block"; // Explicitly show the container
  ARContainer.style.border = "none";
  ARContainer.style.background = "rgba(0,0,0,1)";
  ARContainer.style.position = "absolute";
  ARContainer.style.top = "0";
  ARContainer.style.left = "0";
  ARContainer.style.width = "100vw";
  ARContainer.style.height = "100vh";
  ARContainer.style.zIndex = "1000";

  // Make the scene, camera, geometry, etc.
  const camera = cameraSetup();
  const scene /*: Object */ = new THREE.Scene();
  if (!ARContainer.contains(renderer.domElement)) {
    ARContainer.appendChild(renderer.domElement);
  }
  // Set renderer size to match viewport
  renderer.setSize(window.innerWidth, window.innerHeight);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0.5, 0);
  controls.update();
  // Render function for setAnimationLoop
  function render() {
    // cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(render);
  // Handle resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  // Save to global state for consistency
  gState().set("scnData", {
    scene,
    camera,
    renderer,
    controls,
  });
  // Always start automatically in 2D (2D is always automode)
  start();
};
