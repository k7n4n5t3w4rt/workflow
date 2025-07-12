// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import { headlessClickLoop } from "./headlessClickLoop.js";
import globalSettings from "./globalSettings.js";
import globalState from "./globalState.js";

//------------------------------------------------------------------
// generateTrainingData()
//------------------------------------------------------------------
export const generateTrainingData = () /*: [Array<number>, Array<number>] */ => {
  const inputs = [];
  const labels = [];

  // Define a range of devPowerFix values to test
  const devPowerFixValues = [
    0.4, 0.45, 0.5, 0.6, 0.8, 1.0, 1.2, 1.5, 1.8, 2.2, 2.5, 4.0, 5.0, 6.0,
  ];

  devPowerFixValues.forEach((devPowerFix) => {
    // Reset the state for each run
    globalSettings();
    globalState();
    gSttngs().set("devPowerFix", devPowerFix);

    // Run the simulation
    const result = headlessClickLoop();
    
    // The loop might return undefined if the timebox isn't hit,
    // which can happen in some configs. We only store valid results.
    if (result && typeof result[0] === 'number' && typeof result[1] === 'number') {
      const [flowTime, _] = result;
      inputs.push(flowTime);
      labels.push(devPowerFix);
    }
  });

  return [inputs, labels];
};
