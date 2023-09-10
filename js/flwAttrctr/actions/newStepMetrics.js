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
import setDProps from "./setMetricsDProps.js";
import createTextCanvas from "./createMetricsTextCanvas.js";
//------------------------------------------------------------------
// FUNCTION: newStepMetrics()
//------------------------------------------------------------------
export const newStepMetrics = (
  stepIndex /*: number */,
  metrics /*: Array<{key:string,value:string}>*/,
) /*: void */ => {
  // Get the step info
  const steps = gSttngs().get("steps") || [];
  if (steps[stepIndex] === undefined) {
    return;
  }
  const scnData = gState().get("scnData");
  if (scnData.stepMetrics === undefined) {
    scnData.stepMetrics = [];
  }
  const camera = scnData.camera;
  const step = steps[stepIndex];
  const text = step.name;
  const clckGroup = gState().get("clckCbGroup");
  const textCanvas = createTextCanvas(metrics);
  const texture = new THREE.CanvasTexture(textCanvas);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true, // So the background shows
    opacity: 1, // Set this to any value between 0 (fully transparent) and 1 (fully opaque)
    side: THREE.DoubleSide,
  });
  const aspect = texture.image.width / texture.image.height;
  const planeGeometry = new THREE.PlaneGeometry(aspect, 1);
  const textMesh = new THREE.Mesh(planeGeometry, material);
  textMesh.scale.set(0.5, 0.5, 0.5); // Adjust this as needed
  scnData.stepMetrics.push(textMesh);
  setDProps(textMesh, metrics);
  setPosition(textMesh, stepIndex);
  setRotation(textMesh);
  clckGroup.add(textMesh);
};
export default newStepMetrics;
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
  stpLabel.position.y = strtPosition.y + rangeMax * scale;
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
