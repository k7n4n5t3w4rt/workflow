// @flow
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import resizeVSphereHeadless from "./resizeVSphereHeadless.js";
import resizeVSphereDisplay from "./resizeVSphereDisplay.js";

//------------------------------------------------------------------
// resizeVSphere() - Orchestrator
//
// This function orchestrates the process of resizing the vSphere.
// It first updates the state using the headless function,
// and then triggers the visual animation.
//------------------------------------------------------------------
export default () /*: void */ => {
  // First, update the state.
  resizeVSphereHeadless();

  // Then, trigger the visual animation to reflect the new state.
  resizeVSphereDisplay();
};