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
import onWindowResize from "../actions/onWindowResize.js";
import start from "./start.js";
import addReticleToScene from "./addReticleToScene.js";
import render from "./render.js";
import cameraSetup from "./cameraSetup.js";
import addArContainerToDom from "./addArContainerToDom.js";
import rendererSetup from "./rendererSetup.js";
import labelRendererSetup from "./labelRendererSetup.js";
import startButtonSetup from "./startButtonSetup.js";

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
