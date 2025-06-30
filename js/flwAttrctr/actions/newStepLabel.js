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
  const textCanvas = createLabelCanvas(text);
  const texture = new THREE.CanvasTexture(textCanvas);

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true, // So the background shows
    opacity: 0.75, // Set this to any value between 0 (fully transparent) and 1 (fully opaque)
    side: THREE.DoubleSide,
  });
  // Here we'll use a PlaneGeometry, but it's up to you.
  // Ensure aspect ratio is reasonable to prevent horizontal stretching
  const imageWidth = texture.image.width || 100; // fallback if undefined
  const imageHeight = texture.image.height || 50; // fallback if undefined
  let aspect = imageWidth / imageHeight;

  // Clamp aspect ratio to reasonable bounds to prevent extreme stretching
  aspect = Math.max(0.1, Math.min(10, aspect));

  const planeGeometry = new THREE.PlaneGeometry(aspect, 1);
  const textMesh = new THREE.Mesh(planeGeometry, material);
  textMesh.scale.set(0.02, 0.02, 0.02); // Reduced scale for smaller labels
  scnData.stepLabels.push(textMesh);
  setDProps(textMesh);
  setPosition(textMesh, stepIndex);
  setRotation(textMesh);
  clckGroup.add(textMesh);
};
export default newStepLabel;
//------------------------------------------------------------------
// createLabelCanvas() // Again, renaming for clarity
//------------------------------------------------------------------
const createLabelCanvas = (
  text /*: string */,
  color /*: string */ = "white",
  borderColor /*: string */ = "white",
  bgColor /*: string */ = "black",
  bgOpacity /*: number */ = 0.25,
) /*: HTMLCanvasElement */ => {
  const scaleCm = gState().get("scaleCm");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  text = text.toUpperCase(); // Convert text to uppercase

  const fontSize = 8; // in pixels
  ctx.font = `${fontSize}px Verdana`;
  const textWidth = ctx.measureText(text).width;

  // Debug: log the scaleCm value to understand the issue
  console.log(
    `DEBUG newStepLabel: scaleCm=${scaleCm}, textWidth=${textWidth}, text="${text}"`,
  );

  // Ensure scaleCm has a reasonable value to prevent aspect ratio distortion
  const safeScaleCm = typeof scaleCm === "number" && scaleCm > 0 ? scaleCm : 2;

  // Calculate canvas dimensions with more reasonable proportions
  const canvasWidth = Math.max(50, Math.min(1000, textWidth * 1.2)); // reasonable bounds
  // Use a smaller height multiplier to reduce overall label size while keeping reasonable aspect ratios
  const canvasHeight = Math.max(16, Math.min(80, fontSize * 0.8)); // smaller labels

  console.log(
    `DEBUG newStepLabel: canvasWidth=${canvasWidth}, canvasHeight=${canvasHeight}, aspect=${
      canvasWidth / canvasHeight
    }`,
  );

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const borderThickness = 2; // For border

  // Background fill
  ctx.globalAlpha = bgOpacity;
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Border drawing
  ctx.globalAlpha = 1.0; // Reset opacity for the border
  ctx.lineWidth = borderThickness;
  ctx.strokeStyle = borderColor;
  ctx.strokeRect(
    borderThickness / 2,
    borderThickness / 2,
    canvas.width - borderThickness,
    canvas.height - borderThickness,
  );

  // Text color
  ctx.fillStyle = color;
  ctx.font = `${fontSize}px Verdana`;
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
