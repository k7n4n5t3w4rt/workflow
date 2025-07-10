// @flow
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";
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
import createTextCanvas from "./createTextCanvas.js";
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
  const step = steps[stepIndex];
  if (stepIndex === 0) {
    return;
  }
  const scnData = gState().get("scnData");
  if (scnData.stpMetrics === undefined) {
    scnData.stpMetrics = [];
  }
  const camera = scnData.camera;
  const text = step.name;
  const clckGroup = gState().get("clckCbGroup");
  const fontSize = 25; // in pixels
  const devUnitsTerm = gSttngs().get("devUnitsTerm");
  const textLines = metrics.map((m) => {
    if (m.key === "DvUnts") {
      return `${devUnitsTerm}: ${m.value}`;
    }
    return `${m.key}: ${m.value}`;
  });
  const textCanvas = createTextCanvas(textLines, fontSize);
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
  textMesh.scale.set(0.16, 0.16, 0.16);
  scnData.stpMetrics.push(textMesh);
  setDProps(textMesh, metrics, stepIndex);
  setPosition(textMesh, stepIndex);
  setRotation(textMesh);
  clckGroup.add(textMesh);
};
export default newStepMetrics;
//------------------------------------------------------------------
// setPosition()
//------------------------------------------------------------------
const setPosition = (
  stpMetrics /*: StpMetrics */,
  flwMapIndex /*: number */,
) /*: StpMetrics */ => {
  const strtPosition = gState().get("strtPosition");
  const scale = gState().get("scale");
  const rangeMax = gState().get("rangeMax");
  stpMetrics.position.x = strtPosition.x;
  // stpMetrics.position.y = rangeMax * scale * 2;
  stpMetrics.position.y = strtPosition.y + (rangeMax - 3) * scale;
  stpMetrics.position.z = calculateZPosFromStep(flwMapIndex) - scale;
  // Set the dPosition because we migh need to update it later
  stpMetrics.dPosition = { ...stpMetrics.position };
  return stpMetrics;
};
//------------------------------------------------------------------
// setRotation()
//------------------------------------------------------------------
const setRotation = (stpMetrics /*: StpMetrics */) /*: StpMetrics */ => {
  // const camera = gState().get("scnData").camera;
  const endPosition = gState().get("endPosition");
  let direction = new THREE.Vector3();
  // Calculate direction from textMesh to targetPosition
  direction.subVectors(endPosition, stpMetrics.position);
  // Discard the vertical component of the direction
  direction.y = 0;
  // Normalize the direction
  direction.normalize();
  // Calculate the rotation angle.
  // Note: The default forward direction for objects in three.js is the +z axis.
  let rotationY = Math.atan2(-direction.x, direction.z);
  // Set the y rotation of the textMesh
  stpMetrics.rotation.set(0, rotationY, 0);
  // stpMetrics.lookAt(camera.position);
  // stpMetrics.rotateY(Math.PI);
  return stpMetrics;
};
