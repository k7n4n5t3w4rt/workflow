// @flow
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import updateAgeHeadless from "./updateAgeHeadless.js";
import updateAgeDisplay from "./updateAgeDisplay.js";

//------------------------------------------------------------------
// updateAge() - Orchestrator
//
// This function orchestrates the process of aging a flow item.
// It first updates the state using the headless function,
// and then triggers the visual animation.
//------------------------------------------------------------------
export default () /*: void */ => {
  // First, update the state.
  updateAgeHeadless();

  // Then, trigger the visual animation to reflect the new state.
  updateAgeDisplay();
};