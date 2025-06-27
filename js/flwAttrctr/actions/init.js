// @flow
// Refer to copilot.md for TDD rules.
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
// import { OrbitControls } from "../../../web_modules/three/examples/jsm/controls/OrbitControls.js";
import { CSS2DRenderer } from "../../../web_modules/three/examples/jsm/renderers/CSS2DRenderer.js";
// Also used in the ARButton.js file
import start from "./start.js";
// Actions only used in this file
import cameraSetup from "./init.js_cameraSetup.js";
import onWindowResize from "../actions/init.js_onWindowResize.js";
import addReticleToScene from "./init.js_addReticleToScene.js";
import render from "./init.js_render.js";
import addArContainerToDom from "./init.js_addArContainerToDom.js";
import rendererSetup from "./init.js_rendererSetup.js";
import labelRendererSetup from "./init.js_labelRendererSetup.js";
import startButtonSetup from "./init.js_startButtonSetup.js";

//------------------------------------------------------------------
// FUNCTION: init()
//------------------------------------------------------------------
export const init = () /*: void */ => {
  const x = gSttngs().get("x");
  const y = gSttngs().get("y");
  const z = gSttngs().get("z");
  if (x === undefined || y === undefined || z === undefined) {
    setTimeout(init, 1000);
    return;
  }
  // The AR container is where the AR scene will be rendered
  const ARContainer = addArContainerToDom();
  // Make the scene, camera, geometry, etc.
  const camera = cameraSetup();
  const scene /*: Object */ = new THREE.Scene();
  const renderer = rendererSetup();
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
  if (gSttngs().get("autoMode") === false) {
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
  // The Three.js supplied start button checks for AR support
  startButtonSetup(renderer);
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
export default init;
