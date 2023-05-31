// @flow
// --------------------------------------------------
// THREE.js
// --------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
// --------------------------------------------------
// GLOBALS
// --------------------------------------------------
import globalSettings from "./globalSettings.js";
import globalState from "./globalState.js";
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import ARButton from "./ARButton.js";
import { OrbitControls } from "../../../web_modules/three/examples/jsm/controls/OrbitControls.js";
import createStats from "../../create_stats.js";
import onWindowResize from "../calculations/onWindowResize.js";
import onSelectBuildPixelGrid from "./onSelectStart.js";
import animate from "./animate.js";
import addReticleToScene from "../calculations/addReticleToScene.js";

export default () /*: void */ => {
  const xCm = globalSettings().xCm;
  const yCm = globalSettings().yCm;
  const zCm = globalSettings().zCm;

  // Setting an empty object, to be passed by reference and filled
  globalState("cubes", {
    active: false,
    workFlowItems: [],
    clickCube: {},
  });

  // The stats display for AR
  const stats = createStats();
  const ARContainer = document.createElement("div");
  ARContainer.id = "ar-container";
  const workflow = document.getElementById("workflow");
  // document.body.appendChild(container);
  // $FlowFixMe - Flow doesn't know about the DOM
  workflow.appendChild(ARContainer);

  // Make the scene, camera, geometry, etc.
  const scene /*: Object */ = new THREE.Scene();
  const camera /*: Object */ = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.01,
    50,
  );
  // Does this really get used? Probably not in AR mode
  camera.position.z = 1;
  camera.position.y = Math.abs(parseInt(4 / 2)) * yCm;
  camera.position.x = Math.abs(parseInt(5 / 2)) * xCm;

  // https://threejs.org/docs/#api/en/lights/HemisphereLight
  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  light.position.set(0.5, 1, 0.25);

  scene.add(light);
  //   const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  //   scene.add(ambientLight);

  // https://threejs.org/docs/#api/en/renderers/WebGLRenderer
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  ARContainer.appendChild(renderer.domElement);

  const reticleStuff = addReticleToScene({ stats, scene, camera, renderer });

  const controller = renderer.xr.getController(0);
  // On select (tap in AR mode), build the pixel grid and start
  // calling the move() function on each render to animate the pixels
  controller.addEventListener("select", onSelectBuildPixelGrid());
  scene.add(controller);

  //   // https://threejs.org/docs/#examples/en/controls/OrbitControls
  //   const controls = new OrbitControls(camera, renderer.domElement);
  //   controls.enableZoom = false;

  ARContainer.appendChild(stats.dom);

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

  // Initialise some objects for the global state
  globalState("sceneData", {
    stats,
    scene,
    camera,
    renderer,
    reticleStuff,
  });

  animate();

  window.addEventListener("resize", onWindowResize(camera, renderer, window));
};
