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
import getFlwMpSteps from "../actions/getFlwMpSteps.js";
//------------------------------------------------------------------
// FUNCTION: updateStepMetrics()
//------------------------------------------------------------------
export const updateStepMetrics = (stpMetrics /*: StpMetrics */) /*: void */ => {
  // Get the step info
  const steps = gSttngs().get("steps") || [];
  if (steps[stpMetrics.dStpIndex] === undefined || stpMetrics.dStpIndex === 0) {
    return;
  }
  const step = steps[stpMetrics.dStpIndex];
  const scnData = gState().get("scnData");
  const camera = scnData.camera;
  const flwMpStep = getFlwMpSteps()[stpMetrics.dStpIndex];
  step.avAge = 0;
  const flwItemAges /*: Array<number> */ = [];
  flwMpStep.forEach((flwItem /*: FlwItem */) => {
    flwItemAges.push(flwItem.dStepsAges[stpMetrics.dStpIndex.toString()]);
  });
  let avAge =
    flwItemAges.reduce((acc, num) => acc + num, 0) / flwItemAges.length;
  if (isNaN(avAge)) {
    avAge = 0;
  }
  step.avAge = Math.round(avAge * 100) / 100;
  const clckGroup = gState().get("clckCbGroup");
  const newLimit = step.movingLimit;
  const newAvAge = step.avAge;
  let newDevUnits = 0;
  if (step.status === "touch") {
    newDevUnits = step.movingDevUnits;
  }
  // If the values haven't changed, then don't update
  if (
    newLimit === stpMetrics.Limit &&
    newAvAge === stpMetrics.AvAg &&
    newDevUnits === stpMetrics.DvUnts
  ) {
    // Nothing to update
    return;
  }
  // Update the metrics
  const metrics = [
    { key: "Limit", value: newLimit.toString() },
    // { key: "AvAg", value: newAvAge.toString() },
  ];
  // Only add the DevUnits if it's not zero
  const devUnitsTerm = gSttngs().get("devUnitsTerm");
  if (newDevUnits !== 0) {
    metrics.push({ key: devUnitsTerm, value: newDevUnits });
  }
  const fontSize = 25; // in pixels
  const textLines = metrics.map((m) => `${m.key}: ${m.value}`);
  const textCanvas = createTextCanvas(textLines, fontSize);
  const texture = new THREE.CanvasTexture(textCanvas);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true, // So the background shows
    opacity: 1, // Set this to any value between 0 (fully transparent) and 1 (fully opaque)
    side: THREE.DoubleSide,
  });
  // How doI add the new texture to the existing mesh?
  // Check if the stpMetrics object has a material (assuming it's a mesh)
  if (stpMetrics.material) {
    // Dispose old texture to free up memory
    stpMetrics.material.map.dispose();
    stpMetrics.material.dispose();

    // Assign new texture and material
    stpMetrics.material.map = texture;
    stpMetrics.material = material;
    stpMetrics.material.needsUpdate = true; // Inform Three.js to update the material
  } else {
    // If stpMetrics doesn't have a material (maybe it's the first run), then create and add it

    const geometry = new THREE.PlaneGeometry(
      textCanvas.width / 125, // Assuming you want to scale it down
      textCanvas.height / 125,
    );

    stpMetrics.geometry = geometry;
    stpMetrics.material = material;
    // If needed, add stpMetrics to a group or the scene here
  }
};
export default updateStepMetrics;
