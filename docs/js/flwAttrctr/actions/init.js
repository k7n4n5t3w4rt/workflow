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
import { CSS2DRenderer } from "../../../web_modules/three/examples/jsm/renderers/CSS2DRenderer.js";
import onWindowResize from "../actions/onWindowResize.js";
import start from "./start.js";
import addReticleToScene from "./addReticleToScene.js";
import render from "./render.js";
//------------------------------------------------------------------
// FUNTION: init()
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
    reticleStuff = addReticleToScene({ scene, camera, renderer });
    // This start the whole process when the user clicks the
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
// labelRendererSetup()
//------------------------------------------------------------------
const labelRendererSetup = () /*: Object */ => {
  const labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.domElement.style.position = "absolute";
  labelRenderer.domElement.style.top = "0";
  labelRenderer.domElement.style.pointerEvents = "none";
  labelRenderer.domElement.id = "label-renderer";
  const domOverlayDiv = document.getElementById("dom-overlay");
  if (domOverlayDiv !== null) {
    domOverlayDiv.appendChild(labelRenderer.domElement);
  }
  return labelRenderer;
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
  // The AR container is where the AR scene will be rendered
  const ARContainer = document.createElement("div");
  // Give it an id
  ARContainer.id = "ar-container";
  const flw = document.getElementById("flw");
  // Flow doesn't know about the DOM so we make sure it isn't null
  if (flw !== null) {
    flw.appendChild(ARContainer);
  } else {
    console.error('There is no <div> with id "flw".');
  }
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
