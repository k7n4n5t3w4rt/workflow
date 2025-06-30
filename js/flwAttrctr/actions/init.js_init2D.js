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
import { cameraSetup2D } from "./init.js_cameraSetup.js";
import addReticleToScene from "./init.js_addReticleToScene.js";
import render from "./init.js_render.js";
import addArContainerToDom from "./init.js_addArContainerToDom.js";
import rendererSetup from "./init.js_rendererSetup.js";
import labelRendererSetup from "./init.js_labelRendererSetup.js";
import onWindowResize from "../actions/init.js_onWindowResize.js";
import start from "./start.js";
import { createKeyboardNavigation } from "./keyboardNavigation.js";

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
  const camera = cameraSetup2D();
  const scene /*: Object */ = new THREE.Scene();

  if (!ARContainer.contains(renderer.domElement)) {
    ARContainer.appendChild(renderer.domElement);
  }
  // Set renderer size to match viewport
  renderer.setSize(window.innerWidth, window.innerHeight);

  const controller = new OrbitControls(camera, renderer.domElement);
  // Set the orbit target a bit in front of the camera
  controller.target.set(0, camera.position.y, 0.15);
  controller.update();

  // Setup keyboard navigation for arrow key controls
  const keyboardNav = createKeyboardNavigation({
    moveSpeed: 0.01, // Moderate movement speed
    camera: camera,
    controller: controller
  });

  // --------------------------------------------------------------
  // LABELS - not sure what this is...
  // --------------------------------------------------------------
  const labelRenderer = labelRendererSetup();

  // --------------------------------------------------------------
  // RENDERING
  // --------------------------------------------------------------
  // Render function for setAnimationLoop
  function render() {
    // Update keyboard navigation (camera movement from arrow keys)
    keyboardNav.update();
    
    // Update labels to face camera (similar to main render logic)
    const scnData = gState().get("scnData");
    if (scnData && scnData.stpMetrics !== undefined) {
      for (let metrics of scnData.stpMetrics) {
        metrics.lookAt(scnData.camera.position);
      }
    }
    
    // Update stats if available
    if (scnData && scnData.stats !== undefined) {
      scnData.stats.update();
    }
    
    // Render the scene
    renderer.render(scene, camera);
    
    // Render CSS2D labels if any exist
    if (labelRenderer) {
      labelRenderer.render(scene, camera);
    }
  }
  // Start the render loop
  renderer.setAnimationLoop(render);
  // Handle resize
  window.addEventListener(
    "resize",
    onWindowResize(camera, renderer, labelRenderer, window),
  );
  // Populate the global state, for posterity
  gState().set("scnData", {
    scene,
    camera,
    renderer,
    labelRenderer,
    reticleStuff: {},
    controller,
    keyboardNavigation: keyboardNav, // Store keyboard navigation for cleanup
  });
  // Always start automatically in 2D (2D is always automode)
  start();
};
