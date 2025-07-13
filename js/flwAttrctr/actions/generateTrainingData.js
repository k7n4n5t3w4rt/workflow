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
export const generateTrainingData = (
  devPowerFixValues /*: Array<number> */,
) /*: {inputs: Array<number>, labels:Array<number>} */ => {
  const inputs = [];

  devPowerFixValues.forEach((devPowerFix) => {
    // Set the devPowerFix for each run
    gSttngs().set("devPowerFix", devPowerFix);

    // Run the simulation
    const result = headlessClickLoop(10, []);

    // Get the average of all the flow times in the result
    const flowTime =
      result.reduce((acc, time) => acc + time, 0) / result.length;

    inputs.push(flowTime);
  });

  return { inputs, labels: devPowerFixValues };
};
