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
import ARButton from "./ARButton.js";
// import { OrbitControls } from "../../../web_modules/three/examples/jsm/controls/OrbitControls.js";
import createStats from "../../create_stats.js";
import onWindowResize from "../actions/onWindowResize.js";
import start from "./start.js";
import addReticleToScene from "./addReticleToScene.js";
import render from "./render.js";
//------------------------------------------------------------------
// init()
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
  // const directionalLightHelper = new THREE.DirectionalLightHelper(
  //   directionalLight,
  // );
  // scene.add(directionalLightHelper);
  const renderer = rendererSetup();
  // Not appearing for some reason. I think it is hidden
  const stats = createStats();
  ARContainer.appendChild(stats.dom);
  // Declare it for later
  let reticleStuff = {
    reticle: {},
    active: false,
  };
  const controller /*: Object */ = renderer.xr.getController(0);
  // --------------------------------------------------------------
  // ! AUTOMODE
  // --------------------------------------------------------------
  if (gSttngs().get("autoMode") === false) {
    // The reticle is the donut that appears on the ground
    reticleStuff = addReticleToScene({ stats, scene, camera, renderer });
    // This start the whole process when the user clicks the
    // reticle to put the click cube on the ground
    controller.addEventListener("select", start);
    scene.add(controller);
  }
  // The Three.js supplied start button checks for AR support
  startButtonSetup(renderer);
  // Start the render loop
  renderer.setAnimationLoop(render());
  // A fix for when the phone is rotated, etc
  window.addEventListener("resize", onWindowResize(camera, renderer, window));
  // Populate the global state, for posterity
  gState().set("scnData", {
    stats,
    scene,
    camera,
    renderer,
    reticleStuff,
    controller,
  });
};
export default init;
//------------------------------------------------------------------
// startButtonSetup()
//------------------------------------------------------------------
const startButtonSetup = (renderer /*: Object */) /*: Object */ => {
  // The overlay for sliders, etc
  const domOverlayDiv = document.getElementById("dom-overlay");

  const button = ARButton.createButton(renderer, {
    requiredFeatures: ["hit-test"],
    optionalFeatures: ["dom-overlay"],
    domOverlay: {
      root: domOverlayDiv,
    },
  });
  // $FlowFixMe
  domOverlayDiv.appendChild(button);
};
//------------------------------------------------------------------
// rendererSetup()
//------------------------------------------------------------------
const rendererSetup = () /*: Object */ => {
  // https://threejs.org/docs/#api/en/renderers/WebGLRenderer
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.shadowMap.enabled = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  return renderer;
};
//------------------------------------------------------------------
// addArContainerToDom()
//------------------------------------------------------------------
const addArContainerToDom = () /*: HTMLDivElement */ => {
  const ARContainer = document.createElement("div");
  ARContainer.id = "ar-container";
  const flw = document.getElementById("flw");
  // $FlowFixMe - Flow doesn't know about the DOM
  flw.appendChild(ARContainer);
  return ARContainer;
};
//------------------------------------------------------------------
// cameraSetup()
//------------------------------------------------------------------
const cameraSetup = () /*: Object */ => {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.01,
    50,
  );
  // Does this really get used? Probably not in AR mode
  camera.position.z = 1;
  camera.position.y = Math.abs(parseInt(4 / 2)) * gSttngs().get("y");
  camera.position.x = Math.abs(parseInt(5 / 2)) * gSttngs().get("x");
  return camera;
};
