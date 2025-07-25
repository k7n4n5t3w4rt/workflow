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
import setUpState from "./setUpState.js";
import tearDownState from "./tearDownState.js";
import { headlessClickLoop } from "./headlessClickLoop.js";
// import JoinNode from "three/examples/jsm/nodes/utils/JoinNode";

//------------------------------------------------------------------
// generateTrainingData()
//------------------------------------------------------------------
export const generateTrainingData =
  (
    populateStepsHeadless /*: PopulateStepsHeadlessType */,
    headlessClickLoop /*: HeadlessClickLoopType */,
  ) /*: Function */ =>
  async (
    devPowerFixValues /*: Array<number> */,
  ) /*: Promise<TrainingData> */ => {
    const inputs = [];

    // Copy the initial gState with a deep clone so that we can reset it later
    const initialState = gState().getAllKeyValuePairsDeepCopy();

    // Initialize the global state properly
    globalState();
    setUpState();

    for (const devPowerFix of devPowerFixValues) {
      // Set global for UI feedback
      gState().set("currentDevPowerFix", devPowerFix);
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
      await new Promise((resolve) => setTimeout(resolve, 250));
    }

    const result = { inputs, labels: devPowerFixValues };

    // Restore original properties
    // ...but first, grab the training state from the global state
    const trainingStage = gState().get("trainingStage");
    const lastPrediction = gState().get("lastPrediction");
    const modelTrained = gState().get("modelTrained");
    const lastDataPoint = gState().get("lastDataPoint");
    const currentDevPowerFix = gState().get("currentDevPowerFix");
    const trainingProgress = gState().get("trainingProgress");
    gState().clear();
    gState().setAllKeyValuePairsWithFreshQueues(initialState);
    // Set the training state back to the global state
    gState().set("trainingStage", trainingStage);
    gState().set("lastPrediction", lastPrediction);
    gState().set("lastDataPoint", lastDataPoint);
    gState().set("modelTrained", modelTrained);
    gState().set("currentDevPowerFix", currentDevPowerFix);
    gState().set("trainingProgress", trainingProgress);

    return result;
  };

export default generateTrainingData;
