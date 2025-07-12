// @flow
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import moveHeadless from "./moveHeadless.js";
import moveDisplay from "./moveDisplay.js";

//------------------------------------------------------------------
// move() - Orchestrator
//
// This function orchestrates the process of moving a flow item.
// It first updates the item's state using the headless function,
// and then triggers the visual animation.
//------------------------------------------------------------------
export default (flwItem /*: Object */) /*: void */ => {
  // First, update the state of the flow item.
  moveHeadless(flwItem);

  // Then, trigger the visual animation to reflect the new state.
  moveDisplay(flwItem);
};