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
import populateStepsHeadless from "./populateStepsHeadless.js";

//------------------------------------------------------------------
// generateTrainingData()
//------------------------------------------------------------------
export const generateTrainingData =
  (
    populateStepsHeadless /*: Function */,
    headlessClickLoop /*: Function */,
  ) /*: Function */ =>
  (
    devPowerFixValues /*: Array<number> */,
  ) /*: {inputs: Array<number>, labels:Array<number>} */ => {
    const inputs = [];
    // Ensure steps are populated before running the loop
    populateStepsHeadless();

    devPowerFixValues.forEach((devPowerFix) => {
      // Run the simulation
      const flwTimes = headlessClickLoop(10, devPowerFix, []);

      // Get the average of all the flow times in the result
      // Round the average flow time to 3 decimal places
      const avFlwTime =
        flwTimes.reduce((acc, time) => acc + time, 0) / flwTimes.length;

      // Round the average flow time to 3 decimal places
      // and add it to the inputs array
      const roundedAvFlwTime = Math.round(avFlwTime * 1000) / 1000;
      inputs.push(roundedAvFlwTime);
      // console.log(
      //   `Average flow time for devPowerFix ${devPowerFix}: ${roundedAvFlwTime}`,
      // );
    });

    return { inputs, labels: devPowerFixValues };
  };
