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
import ARButton from "./ARButton.js";
import { OrbitControls } from "../../../web_modules/three/examples/jsm/controls/OrbitControls.js";
import createStats from "../../create_stats.js";
import onWindowResize from "../calculations/onWindowResize.js";
import placeClickCubeAndStart from "./onSelectStart.js";
import addReticleToScene from "../calculations/addReticleToScene.js";
import render from "./render.js";

export default () /*: void */ => {
  // The stats display for AR
  const stats = createStats();
  const ARContainer = document.createElement("div");
  ARContainer.id = "ar-container";
  const wrkflw = document.getElementById("wrkflw");
  // document.body.appendChild(container);
  // $FlowFixMe - Flow doesn't know about the DOM
  wrkflw.appendChild(ARContainer);

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
  camera.position.y = Math.abs(parseInt(4 / 2)) * gSttngs().y;
  camera.position.x = Math.abs(parseInt(5 / 2)) * gSttngs().x;

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

  // This start the whole process when the user places
  // the click cube on the ground
  controller.addEventListener("select", placeClickCubeAndStart());
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

  renderer.setAnimationLoop(render());

  window.addEventListener("resize", onWindowResize(camera, renderer, window));

  // --------------------------------------------------
  // Populate the global state
  // --------------------------------------------------
  gState("clicks", 0);
  // Setting an empty "objects" object so we don't get Flow errors
  gState("objects", {
    wrkflwItems: [],
    clickCube: {},
    wrkflwStepTotals: {
      touchTotal: 0,
      doneTotal: 0,
    },
  });

  gState("sceneData", {
    stats,
    scene,
    camera,
    reticleStuff,
    renderer,
  });

  gState("valueQueue", new valueQueue());
};

function valueQueue() /*: void */ {
  this.items = {};
  this.headIndex = 0;
  this.tailIndex = 0;

  this.enqueue = (item /*: number */) /*: void */ => {
    this.items[this.tailIndex] = item;
    this.tailIndex++;
  };

  this.dequeue = () /*: number */ => {
    const item = this.items[this.headIndex];
    delete this.items[this.headIndex];
    this.headIndex++;
    return item;
  };

  this.total = () /*: number */ => {
    let total = 0;
    for (const index in this.items) {
      total += this.items[index];
    }
    return total;
  };

  this.length = () /*: number */ => {
    return this.tailIndex - this.headIndex;
  };
}
