// @flow
// 3D/AR experience for AR-supported browsers
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import { cameraSetupAR } from "./init.js_cameraSetup.js";
import addReticleToScene from "./init.js_addReticleToScene.js";
import render from "./init.js_render.js";
import addArContainerToDom from "./init.js_addArContainerToDom.js";
import rendererSetup from "./init.js_rendererSetup.js";
import labelRendererSetup from "./init.js_labelRendererSetup.js";
import onWindowResize from "../actions/init.js_onWindowResize.js";
import start from "./start.js";

//
// renderer: WebGLRenderer
//
export const init3D = function (renderer /*: ThrRenderer */) /*: void */ {
  // The AR container is where the AR scene will be rendered
  const ARContainer = addArContainerToDom();
  // Make the scene, camera, geometry, etc.
  const camera = cameraSetupAR();
  const scene /*: Object */ = new THREE.Scene();
  // --------------------------------------------------------------
  // RETICLE & CONTROLLER
  // --------------------------------------------------------------
  // The reticle is the doughnut that appears on the ground.
  // It has to be initialised, even in automode so that it can
  // be used in the scene
  let reticleStuff = {
    reticle: {},
    active: false,
  };
  const controller /*: Object */ = renderer.xr.getController(0);
  // --------------------------------------------------------------
  // ! AUTOMODE
  // --------------------------------------------------------------
  if (gState().get("autoMode") === false) {
    reticleStuff = addReticleToScene({ scene, camera, renderer });
    // This starts the whole process when the user clicks the
    // reticle to put the click cube on the ground
    controller.addEventListener("select", start);
    scene.add(controller);
  }
  // --------------------------------------------------------------
  // LABELS
  // --------------------------------------------------------------
  const labelRenderer = labelRendererSetup();
  // --------------------------------------------------------------
  // RENDERING
  // --------------------------------------------------------------
  // Start the render loop
  renderer.setAnimationLoop(render());
  // A fix for when the phone is rotated, etc
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
    reticleStuff,
    controller,
  });
};
