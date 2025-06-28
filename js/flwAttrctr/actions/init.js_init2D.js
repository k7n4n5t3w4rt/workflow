// @flow
// 2D fallback experience for non-AR browsers
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
import { OrbitControls } from "../../../web_modules/three/examples/jsm/controls/OrbitControls.js";
import addArContainerToDom from "./init.js_addArContainerToDom.js";
import rendererSetup from "./init.js_rendererSetup.js";

//
// renderer: WebGLRenderer
//
export const init2D = function (renderer /*: ThrRenderer */) /*: void */ {
  // Add or reuse the AR container
  const ARContainer = addArContainerToDom();
  // Debug: style the AR container to ensure visibility and sizing
  ARContainer.style.display = "block"; // Explicitly show the container
  ARContainer.style.border = "none";
  ARContainer.style.background = "rgba(255,0,0,0.1)";
  ARContainer.style.position = "absolute";
  ARContainer.style.top = "0";
  ARContainer.style.left = "0";
  ARContainer.style.width = "100vw";
  ARContainer.style.height = "100vh";
  ARContainer.style.zIndex = "1000";
  // Set up a basic Three.js scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(0, 2, 5);
  renderer.setClearColor(0x222233);
  // Attach renderer to container if not already present
  if (!ARContainer.contains(renderer.domElement)) {
    ARContainer.appendChild(renderer.domElement);
  }
  // Set renderer size to match viewport
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Add a ground plane
  const geometry = new THREE.PlaneGeometry(10, 10);
  const material = new THREE.MeshStandardMaterial({ color: 0x888888 });
  const plane = new THREE.Mesh(geometry, material);
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);
  // Add a cube
  const cubeGeometry = new THREE.BoxGeometry();
  const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.y = 0.5;
  scene.add(cube);
  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
  dirLight.position.set(5, 10, 7.5);
  scene.add(dirLight);
  // Add OrbitControls for 2D navigation
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0.5, 0);
  controls.update();
  // Render loop
  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();
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
};
