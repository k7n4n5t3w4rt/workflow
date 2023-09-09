// @flow
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
import { CSS2DObject } from "../../../web_modules/three/examples/jsm/renderers/CSS2DRenderer.js";
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import calculateZPosFromStep from "./calculateZPosFromStep.js";

export const newStepLabel = (stepIndex /*: number */) /*: void */ => {
  // Get the step info
  const steps = gSttngs().get("steps") || [];
  if (steps[stepIndex] === undefined) {
    return;
  }
  const scnData = gState().get("scnData");
  if (scnData.stepLabels === undefined) {
    scnData.stepLabels = [];
  }
  const camera = scnData.camera;
  const step = steps[stepIndex];
  const text = step.name;
  const clckGroup = gState().get("clckCbGroup");
  const textCanvas = createTextCanvas(text);
  const texture = new THREE.CanvasTexture(textCanvas);

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true, // So the background shows
    opacity: 0.75, // Set this to any value between 0 (fully transparent) and 1 (fully opaque)
    side: THREE.DoubleSide,
  });
  // Here we'll use a PlaneGeometry, but it's up to you.
  const aspect = texture.image.width / texture.image.height;
  const planeGeometry = new THREE.PlaneGeometry(aspect, 1);
  const textMesh = new THREE.Mesh(planeGeometry, material);
  textMesh.scale.set(0.1, 0.1, 0.1); // Adjust this as needed
  scnData.stepLabels.push(textMesh);
  setDProps(textMesh);
  setPosition(textMesh, stepIndex);
  setRotation(textMesh);
  clckGroup.add(textMesh);
};
export default newStepLabel;
//------------------------------------------------------------------
// createTextCanvas()
//------------------------------------------------------------------
const createTextCanvas = (
  text /*: string */,
  color /*: string */ = "black",
  bgColor /*: string */ = "white",
) /*: HTMLCanvasElement */ => {
  const scaleCm = gState().get("scaleCm");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const fontSize = 24; // in pixels
  ctx.font = `${fontSize}px Courier`;
  const textWidth = ctx.measureText(text).width;

  canvas.width = textWidth * 1.2;
  canvas.height = fontSize * (scaleCm / 4); // This assumes some amount of padding.

  // Background color
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Text color
  ctx.fillStyle = color;
  ctx.font = `${fontSize}px Courier`;
  ctx.textBaseline = "middle"; // Center vertically
  const centerX = (canvas.width - textWidth) / 2;
  const centerY = canvas.height / 2;
  ctx.fillText(text, centerX, centerY);

  return canvas;
};

//------------------------------------------------------------------
// setDProps(flwItem)
//------------------------------------------------------------------
const setDProps = (stpLabel /*: StpLabel */) /*: StpLabel */ => {
  // Set the name to the uuid so we can find it later - Three.js "needs" a name property
  stpLabel.name = stpLabel.uuid;
  return stpLabel;
};
//------------------------------------------------------------------
// setPosition()
//------------------------------------------------------------------
const setPosition = (
  stpLabel /*: StpLabel */,
  flwMapIndex /*: number */,
) /*: void */ => {
  const strtPosition = gState().get("strtPosition");
  const scale = gState().get("scale");
  const rangeMax = gState().get("rangeMax");
  stpLabel.position.x = strtPosition.x;
  // stpLabel.position.y = rangeMax * scale * 2;
  stpLabel.position.y = strtPosition.y;
  stpLabel.position.z = calculateZPosFromStep(flwMapIndex) - scale;
  // Set the dPosition because refineNewPosition() needs it
  stpLabel.dPosition = { ...stpLabel.position };
};

//------------------------------------------------------------------
// setRotation()
//------------------------------------------------------------------
const setRotation = (stpLabel /*: StpLabel */) /*: void */ => {
  // const camera = gState().get("scnData").camera;
  const endPosition = gState().get("endPosition");
  let direction = new THREE.Vector3();
  // Calculate direction from textMesh to targetPosition
  direction.subVectors(endPosition, stpLabel.position);
  // Discard the vertical component of the direction
  direction.y = 0;
  // Normalize the direction
  direction.normalize();
  // Calculate the rotation angle.
  // Note: The default forward direction for objects in three.js is the +z axis.
  let rotationY = Math.atan2(-direction.x, direction.z);
  // Set the y rotation of the textMesh
  stpLabel.rotation.set(0, rotationY, 0);
  // stpLabel.lookAt(camera.position);
  // stpLabel.rotateY(Math.PI);
};
