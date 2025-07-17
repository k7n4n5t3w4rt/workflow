// Type definition for generateTrainingData
export type GenerateTrainingDataType = (
  populateStepsHeadless: PopulateStepsHeadlessType,
  headlessClickLoop: HeadlessClickLoopType,
) => (devPowerFixValues: Array<number>) => {
  inputs: Array<number>,
  labels: Array<number>,
};
// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import globalSettings from "./globalSettings.js";
import globalState from "./globalState.js";
import populateStepsHeadless from "./populateStepsHeadless.js";
import type { PopulateStepsHeadlessType } from "./populateStepsHeadless.js";
import { headlessClickLoop } from "./headlessClickLoop.js";
import type { HeadlessClickLoopType } from "./headlessClickLoop.js";

//------------------------------------------------------------------
// generateTrainingData()
//------------------------------------------------------------------
export const generateTrainingData =
  (
    populateStepsHeadless /*: PopulateStepsHeadlessType */,
    headlessClickLoop /*: HeadlessClickLoopType */,
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
