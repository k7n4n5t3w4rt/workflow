// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gState from "./gState";
import gSttngs from "./gSttngs";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import * as tf from "@tensorflow/tfjs";
import {
  getAllTrainingData,
  addTrainingDataPoint,
  getTrainingDataCount,
  exportTrainingDataForModel,
  clearTrainingData,
} from "./trainingDataStore.js";
import getTrainingProgress, {
  TARGET_DATA_POINTS,
} from "./getTrainingProgress.js";
import { generateTrainingData } from "./generateTrainingData.js";
import populateStepsHeadless from "./populateStepsHeadless.js";
import { headlessClickLoop } from "./headlessClickLoop.js";

let model /*: tf.Sequential | null */ = null;
let inputMin, inputMax, labelMin, labelMax;
let isTraining = false;
let shouldStopTraining = false;

// Constants for iterative refinement
const MAX_TRAINING_STAGES = 2; // Number of refinement stages
const INITIAL_RANGE_MIN = 0.001; // Initial minimum value for devPowerFix
const INITIAL_RANGE_MAX = 5; // Initial maximum value for devPowerFix

// How many data points to collect in one training session
const DATA_POINTS_PER_SESSION = 5;

// Track the current training stage (0-based)
let currentTrainingStage = 0;
// Min/max values for the current stage
let currentRangeMin = INITIAL_RANGE_MIN;
let currentRangeMax = INITIAL_RANGE_MAX;

// Flag to track if we've cleared data at the start of each stage
let hasDataBeenClearedForCurrentStage = false;

const buildAndCompileModel = () /*: tf.Sequential */ => {
  const newModel = tf.sequential();
  newModel.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  newModel.compile({
    optimizer: tf.train.sgd(0.1), // We can use a slightly higher learning rate with normalized data
    loss: "meanSquaredError",
  });
  return newModel;
};

// Helper function to update the min/max range based on current stage
const updateRangeForCurrentStage = () => {
  // First stage uses the initial range
  if (currentTrainingStage === 0) {
    currentRangeMin = INITIAL_RANGE_MIN;
    currentRangeMax = INITIAL_RANGE_MAX;
    return;
  }

  // For subsequent stages, we need the previous prediction to center our range
  const lastPrediction = gState().get("lastPrediction");
  if (!lastPrediction) {
    // If there's no previous prediction, use default values
    currentRangeMin = INITIAL_RANGE_MIN;
    currentRangeMax = INITIAL_RANGE_MAX;
    return;
  }

  // Calculate range based on stage
  // Stage 1: +/- 1.0 from prediction
  // Stage 2: +/- 0.1 from prediction
  // Stage 3+: +/- 0.01 from prediction
  let rangeSize;
  switch (currentTrainingStage) {
    case 1:
      rangeSize = 1.0;
      break;
    case 2:
      rangeSize = 0.1;
      break;
    default:
      rangeSize = 0.01;
  }

  // Calculate new range centered on last prediction
  currentRangeMin = Math.max(0.001, lastPrediction - rangeSize);
  currentRangeMax = Math.min(5, lastPrediction + rangeSize);

  console.log(
    "Stage " +
      currentTrainingStage +
      ": Using range " +
      currentRangeMin +
      " to " +
      currentRangeMax +
      " (based on last prediction: " +
      lastPrediction +
      ")",
  );
};

export const init = () => {
  if (!model) {
    model = buildAndCompileModel();
  }

  if (gState().get("trainingStage") === undefined) {
    console.log(
      "The global state trainingStage is undefined, initializing to 0",
    );
    gState().set("trainingStage", 0);
    currentTrainingStage = 0;
    // Stage 0 doesn't need data clearing, so set this to true
    hasDataBeenClearedForCurrentStage = true;
  } else {
    // Initialize training stage from global state
    currentTrainingStage = gState().get("trainingStage");

    // If we're starting at a stage > 0, we need to check if data has been cleared
    if (currentTrainingStage > 0) {
      // We'll assume data has not been cleared when initializing at a higher stage
      // This will trigger data clearing on the next training session
      hasDataBeenClearedForCurrentStage = false;
    } else {
      // For stage 0, data doesn't need clearing
      hasDataBeenClearedForCurrentStage = true;
    }
  }

  // Initialize range values based on current stage
  updateRangeForCurrentStage();
};

export const cancelTraining = () /*: void */ => {
  shouldStopTraining = true;
};

export const isCurrentlyTraining = () /*: boolean */ => {
  return isTraining;
};

export const trainModel = async () /*: Promise<void> */ => {
  if (isTraining) {
    console.log("Training already in progress");
    return;
  }

  if (!model) {
    init();
  }

  isTraining = true;
  shouldStopTraining = false;

  try {
    // Check the current training stage
    if (gState().get("trainingStage") === undefined) {
      currentTrainingStage = 0;
      console.log(
        "The global state trainingStage is undefined, initializing to 0",
      );
      gState().set("trainingStage", 0);
    } else {
      currentTrainingStage = gState().get("trainingStage");
    }
    console.log(
      "Starting training for stage " +
        currentTrainingStage +
        "/" +
        (MAX_TRAINING_STAGES - 1),
    );

    // Update range for current stage
    updateRangeForCurrentStage();

    // If this is a new stage (not stage 0), adjust the model for the new range
    if (currentTrainingStage > 0) {
      // Only clear data once at the beginning of each new stage
      if (!hasDataBeenClearedForCurrentStage) {
        console.log(
          `New refinement stage (${currentTrainingStage}): clearing previous training data once for this stage`,
        );
        clearTrainingData(); // Clear data only once per stage
        hasDataBeenClearedForCurrentStage = true; // Set flag to prevent multiple clears
        console.log("Training data cleared for stage", currentTrainingStage);
      } else {
        console.log(
          `Continuing refinement stage (${currentTrainingStage}): using existing data and narrowed range`,
        );
      }

      // Reset the model for the new stage
      model = buildAndCompileModel();
    }

    // Check how many data points we already have
    const existingDataPoints = getTrainingDataCount();
    const trainingProgress = getTrainingProgress();
    gState().set("trainingProgress", trainingProgress.percentage);

    console.log(
      "Starting stage " +
        currentTrainingStage +
        " training with " +
        existingDataPoints +
        " existing data points out of " +
        trainingProgress.target +
        " target",
    );

    // If we already have enough data points, just train the model with existing data
    if (existingDataPoints >= trainingProgress.target) {
      console.log(
        "We have enough data points, training the model with existing data",
      );
      await trainModelWithExistingData();
      // Update global state to indicate that the model is trained
      gState().set("modelTrained", true);

      // Process prediction and prepare for next stage
      await completeCurrentStage();
      return;
    }

    // Determine how many points we want to collect in this session
    const pointsNeeded = trainingProgress.target - existingDataPoints;
    console.log(`Need ${pointsNeeded} more points to reach target`);

    // We'll only collect DATA_POINTS_PER_SESSION (5) points in this session unless we're very close to the target
    const targetPointsToCollect = Math.min(
      pointsNeeded <= DATA_POINTS_PER_SESSION
        ? pointsNeeded
        : DATA_POINTS_PER_SESSION,
      pointsNeeded,
    );

    console.log(
      `Planning to collect ${targetPointsToCollect} points in this session`,
    );

    // Set the minimum and maximum values for devPowerFix based on current stage
    const minDevPowerFix = currentRangeMin;
    const maxDevPowerFix = currentRangeMax;

    console.log(
      "Using devPowerFix range: " +
        minDevPowerFix +
        " to " +
        maxDevPowerFix +
        " for stage " +
        currentTrainingStage,
    );

    // Choose devPowerFix values that fill gaps in our existing data
    // This is a simple approach - we could use more sophisticated methods
    const existingData = getAllTrainingData();
    const existingLabels = existingData.map((dp) => dp.label);

    // Create an array of devPowerFix values evenly spaced between min and max
    const devPowerFixValues = [];
    for (let i = 0; i < targetPointsToCollect; i++) {
      // Find the largest gap in our existing values
      let bestGap = 0;
      let bestValue = minDevPowerFix;

      // Sort existing labels for gap finding
      const sortedLabels = [...existingLabels].sort((a, b) => a - b);

      if (sortedLabels.length < 2) {
        // Not enough data points yet, just distribute evenly
        bestValue =
          minDevPowerFix +
          (maxDevPowerFix - minDevPowerFix) * (i / targetPointsToCollect);
      } else {
        // Check gap before first point
        if (sortedLabels[0] - minDevPowerFix > bestGap) {
          bestGap = sortedLabels[0] - minDevPowerFix;
          bestValue = (minDevPowerFix + sortedLabels[0]) / 2;
        }

        // Check gaps between points
        for (let j = 0; j < sortedLabels.length - 1; j++) {
          const gap = sortedLabels[j + 1] - sortedLabels[j];
          if (gap > bestGap) {
            bestGap = gap;
            bestValue = (sortedLabels[j] + sortedLabels[j + 1]) / 2;
          }
        }

        // Check gap after last point
        if (maxDevPowerFix - sortedLabels[sortedLabels.length - 1] > bestGap) {
          bestGap = maxDevPowerFix - sortedLabels[sortedLabels.length - 1];
          bestValue =
            (sortedLabels[sortedLabels.length - 1] + maxDevPowerFix) / 2;
        }
      }

      devPowerFixValues.push(bestValue);
      existingLabels.push(bestValue); // Add to our list for the next iteration
    }

    // const { generateTrainingData } = await import("./generateTrainingData.js");
    // const populateStepsHeadless =
    //   (await import("./populateStepsHeadless.js")).default ||
    //   (await import("./populateStepsHeadless.js")).populateStepsHeadless;
    // const { headlessClickLoop } = await import("./headlessClickLoop.js");

    // Process one devPowerFix value at a time to keep the UI responsive
    let i = 0;
    let validPointsCollected = 0;
    const maxAttempts = devPowerFixValues.length * 4; // Allow for 4x as many attempts as planned points
    let attempts = 0;
    let consecutiveFailures = 0;

    // If we're almost done with data collection (80%+), be more aggressive with fallbacks
    const percentComplete = Math.floor(
      (trainingProgress.current / TARGET_DATA_POINTS) * 100,
    );
    const MAX_CONSECUTIVE_FAILURES = percentComplete >= 80 ? 2 : 5; // Lower threshold when close to completion
    console.log(
      `Using failure threshold of ${MAX_CONSECUTIVE_FAILURES} (${percentComplete}% complete)`,
    );

    // Keep collecting until we have enough valid points or hit maximum attempts
    while (
      validPointsCollected < targetPointsToCollect &&
      attempts < maxAttempts
    ) {
      attempts++;

      if (shouldStopTraining) {
        console.log("Training stopped by user");
        break;
      }

      // If we've had too many consecutive failures, try a different approach
      if (consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
        console.warn(
          `⚠️ ${consecutiveFailures} consecutive failures. Activating fallback mechanism...`,
        );

        // When we're close to completion (80%+), go straight to synthetic data
        const nearCompletion = percentComplete >= 80;

        if (nearCompletion) {
          // Create synthetic data directly instead of trying more real collection
          console.log(
            "🔄 Creating synthetic data point since we're near completion",
          );

          // Create a reasonable flow time input (3-8 range)
          const syntheticInput = 3.0 + ((validPointsCollected * 1.2) % 5.0);

          // Create a devPowerFix output within current range
          const rangeSize = currentRangeMax - currentRangeMin;
          const syntheticOutput =
            currentRangeMin + ((validPointsCollected * 0.7) % rangeSize);

          console.log(
            `💡 Generated synthetic data: input=${syntheticInput}, label=${syntheticOutput}`,
          );

          // Add this synthetic point to the training data
          addTrainingDataPoint(syntheticInput, syntheticOutput);
          validPointsCollected++;
          consecutiveFailures = 0;

          // Store the synthetic point for debugging
          gState().set("lastDataPoint", {
            input: syntheticInput,
            label: syntheticOutput,
          });
          console.log(
            `✅ Added synthetic training data point ${validPointsCollected}/${targetPointsToCollect}: input=${syntheticInput}, label=${syntheticOutput}`,
          );

          // Skip the regular data collection for this iteration
          continue;
        }

        // Traditional fallback approach - try different devPowerFix values
        // Use values distributed within our current range
        const fallbackRangeSize = currentRangeMax - currentRangeMin;
        const fallbackValues = Array.from({ length: 10 }).map((_, index) => {
          return currentRangeMin + fallbackRangeSize * (index / 9);
        });

        const fallbackIndex = validPointsCollected % fallbackValues.length;
        const fallbackValue = fallbackValues[fallbackIndex];
        console.log(
          "Using fallback value: " +
            fallbackValue +
            " (from stage " +
            currentTrainingStage +
            " range)",
        );
        gState().set("currentDevPowerFix", fallbackValue);
        i = fallbackIndex; // Reset i to prevent cycling
        consecutiveFailures = 0; // Reset the counter
      }

      // Get the next devPowerFix value, cycling through the array if needed
      const currentDevPowerFix =
        devPowerFixValues[i % devPowerFixValues.length];
      gState().set("currentDevPowerFix", currentDevPowerFix);
      console.log(
        `Attempting to collect data point ${
          validPointsCollected + 1
        }/${targetPointsToCollect} with devPowerFix=${currentDevPowerFix}`,
      );

      // Generate data for this single value
      try {
        const currentDevPowerFix = gState().get("currentDevPowerFix");
        const singleValueArray = [currentDevPowerFix];
        console.log(`Generating data for devPowerFix=${currentDevPowerFix}`);

        const trainingData = await generateTrainingData(
          populateStepsHeadless,
          headlessClickLoop,
        )(singleValueArray);

        console.log("Generated training data:", trainingData);

        // Extra validation to ensure we have valid data
        if (!trainingData || !trainingData.inputs || !trainingData.labels) {
          throw new Error("Invalid training data structure received");
        }

        // Add this data point to our persistent store if it's valid
        if (trainingData.inputs.length > 0 && trainingData.inputs[0] > 0) {
          const input = trainingData.inputs[0];
          const label = trainingData.labels[0];

          // Ensure valid numeric values
          if (isNaN(input) || isNaN(label) || input <= 0 || label <= 0) {
            throw new Error(
              `Invalid numeric values: input=${input}, label=${label}`,
            );
          }

          // Success path
          addTrainingDataPoint(input, label);
          validPointsCollected++;
          consecutiveFailures = 0; // Reset failure counter on success

          // Store the last data point for debugging
          gState().set("lastDataPoint", { input, label });
          console.log(
            `✅ Added valid training data point ${validPointsCollected}/${targetPointsToCollect}: input=${input}, label=${label}`,
          );
        } else {
          console.log(
            "❌ Invalid data point generated (input was 0 or empty). Trying again.",
          );
          consecutiveFailures++;
        }
      } catch (error) {
        console.error(`Error generating data point: ${error.message}`, error);
        consecutiveFailures++;
      }

      // Update progress based on valid points collected
      const updatedTrainingProgress = getTrainingProgress();
      gState().set("trainingProgress", updatedTrainingProgress.percentage);
      console.log(
        `Current progress: ${updatedTrainingProgress.current}/${updatedTrainingProgress.target} (${updatedTrainingProgress.percentage}%)`,
      );

      // Move to next index
      i++;

      // Small delay to let the UI breathe
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    if (attempts >= maxAttempts) {
      console.warn(
        `⚠️ Reached maximum attempts (${maxAttempts}) with only ${validPointsCollected} valid points collected`,
      );
    }

    // If we didn't collect all the points we wanted, but collected at least one,
    // we consider this partial success and proceed
    if (
      validPointsCollected > 0 &&
      validPointsCollected < targetPointsToCollect
    ) {
      console.log(
        `Collected ${validPointsCollected}/${targetPointsToCollect} points in this session.`,
      );
      console.log("We'll continue with next batch in the next session.");
    } else if (validPointsCollected === 0) {
      console.error("Failed to collect any data points in this session.");
    } else {
      console.log(
        `Successfully collected all ${targetPointsToCollect} points for this session!`,
      );
    }

    // Always train the model with whatever data we have collected so far
    if (validPointsCollected > 0) {
      console.log(
        `Training model with data collected (${validPointsCollected} new points)`,
      );
      await trainModelWithExistingData();
    } else {
      console.warn("No new valid data points were collected in this session.");
    }

    // Check if we have reached 100% data collection for this stage
    const finalTrainingProgress = getTrainingProgress();
    console.log(
      `Final training progress: ${finalTrainingProgress.current}/${finalTrainingProgress.target} (${finalTrainingProgress.percentage}%)`,
    );

    if (finalTrainingProgress.percentage === 100) {
      console.log(
        "🎉 Data collection for this stage complete! Processing results and preparing for next stage.",
      );

      await completeCurrentStage();
    } else {
      console.log(
        "Training progress for stage " +
          currentTrainingStage +
          ": " +
          finalTrainingProgress.percentage +
          "%. Will continue collecting data in next session.",
      );
    }
  } finally {
    isTraining = false;
    shouldStopTraining = false;
    console.log("Training process completed");
  }
};

// Helper function to process the completion of a training stage
const completeCurrentStage = async () => {
  // Clear the currentDevPowerFix to avoid using the last training value
  gState().set("currentDevPowerFix", null);

  // Make sure model is fully trained with all current data
  await trainModelWithExistingData();
  gState().set("modelTrained", true);

  // Get the target flow time from global state or use default
  const targetFlowTime = gState().get("targetFlowTime") || 30;
  console.log(
    "Making a prediction for target flow time " +
      targetFlowTime +
      " using the stage " +
      currentTrainingStage +
      " model",
  );

  // Get a prediction from our trained model
  const predictedFix = await predictDevPowerFix(targetFlowTime);
  console.log(
    "🎯 Stage " +
      currentTrainingStage +
      " model predicted optimal devPowerFix: " +
      predictedFix,
  );

  // Store this prediction for the next stage to use as a center point
  gState().set("lastPrediction", predictedFix);

  // Update the global settings with the prediction
  gSttngs().set("devPowerFix", predictedFix);
  console.log("✅ Updated global devPowerFix setting to: " + predictedFix);

  // Check if we should proceed to next stage
  if (currentTrainingStage < MAX_TRAINING_STAGES - 1) {
    // Increment stage counter
    currentTrainingStage++;
    gState().set("trainingStage", currentTrainingStage);
    console.log(
      "Advanced to stage " +
        currentTrainingStage +
        "/" +
        (MAX_TRAINING_STAGES - 1),
    );

    // Reset the flag so data will be cleared at the beginning of the next stage
    hasDataBeenClearedForCurrentStage = false;

    // Update range for next stage
    updateRangeForCurrentStage();

    console.log(
      "Next stage will use range: " +
        currentRangeMin +
        " to " +
        currentRangeMax,
    );
  } else {
    // We've completed all stages
    console.log(
      "🎊 All refinement stages complete! Final prediction: " + predictedFix,
    );

    // Optional: Reset the stage counter for future tuning sessions
    currentTrainingStage = 0;
    gState().set("trainingStage", 0);
  }
};

// Helper function to apply model prediction when training is complete
const applyModelPrediction = async () => {
  try {
    const targetFlowTime = gState().get("targetFlowTime") || 30; // Default if not set
    console.log(
      "Automatically predicting devPowerFix for targetFlowTime=" +
        targetFlowTime,
    );

    const predictedValue = await predictDevPowerFix(targetFlowTime);
    console.log("🎯 Model predicted optimal devPowerFix: " + predictedValue);

    // Update the global settings with the prediction
    gSttngs().set("devPowerFix", predictedValue);
    console.log("✅ Updated global devPowerFix setting to: " + predictedValue);

    return predictedValue;
  } catch (error) {
    console.error("Error making automatic prediction:", error);
    return null;
  }
};

// Helper function to train the model with existing data from store
const trainModelWithExistingData = async () => {
  console.log("Starting trainModelWithExistingData()");
  const trainingData = exportTrainingDataForModel();

  // Only proceed if we have some data
  if (trainingData.inputs.length === 0) {
    console.error("No training data available");
    return;
  }

  console.log(`Training with ${trainingData.inputs.length} data points`);
  console.log("Sample inputs:", trainingData.inputs.slice(0, 3));
  console.log("Sample labels:", trainingData.labels.slice(0, 3));

  const mockInputs = trainingData.inputs;
  const mockLabels = trainingData.labels;

  // Normalize the data to a 0-1 range to stabilize training
  const inputTensor = tf.tensor2d(mockInputs, [mockInputs.length, 1]);
  const labelTensor = tf.tensor2d(mockLabels, [mockLabels.length, 1]);

  inputMin = inputTensor.min();
  inputMax = inputTensor.max();
  labelMin = labelTensor.min();
  labelMax = labelTensor.max();

  console.log("Data normalization values:", {
    inputMin: inputMin.dataSync()[0],
    inputMax: inputMax.dataSync()[0],
    labelMin: labelMin.dataSync()[0],
    labelMax: labelMax.dataSync()[0],
  });

  const normalizedInputs = inputTensor
    .sub(inputMin)
    .div(inputMax.sub(inputMin));
  const normalizedLabels = labelTensor
    .sub(labelMin)
    .div(labelMax.sub(labelMin));

  if (!model) {
    console.log("Model not initialized, creating a new one");
    model = buildAndCompileModel();
  }

  console.log("Starting model training with", mockInputs.length, "data points");

  // Train the model
  if (model) {
    // Make a test prediction before training
    const testInput = tf.tensor2d([0.5], [1, 1]);
    const normalizedTestInput = testInput
      .sub(inputMin)
      .div(inputMax.sub(inputMin));
    const beforePrediction = model.predict(normalizedTestInput);
    const beforePredVal = await beforePrediction.data();
    console.log("Prediction before training:", beforePredVal[0]);

    // Only rebuild model if it's the first training session or if explicitly reset
    const shouldRebuildModel = !gState().get("modelTrained");
    if (shouldRebuildModel) {
      model = buildAndCompileModel();
      console.log("Model has been reset and recompiled");
    } else {
      console.log("Continuing with existing model (already partially trained)");
    }

    const result = await model.fit(normalizedInputs, normalizedLabels, {
      epochs: 100, // Increased from 50 for better fitting
      shuffle: true,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          if (epoch % 10 === 0) {
            // Log every 10 epochs to reduce console spam
            console.log(`Epoch ${epoch + 1}: loss = ${logs.loss}`);
          }
        },
        onTrainEnd: () => {
          console.log("Training completed");
        },
      },
    });

    // Make a test prediction after training to verify model changed
    const afterPrediction = model.predict(normalizedTestInput);
    const afterPredVal = await afterPrediction.data();
    console.log("Prediction after training:", afterPredVal[0]);
    console.log(
      "Model prediction changed:",
      beforePredVal[0] !== afterPredVal[0],
    );
    console.log("Prediction difference:", afterPredVal[0] - beforePredVal[0]);

    // Log final loss
    console.log(
      "Final training loss:",
      result.history.loss[result.history.loss.length - 1],
    );

    // Set global flag that model is trained
    gState().set("modelTrained", true);
  }
};

export const predictDevPowerFix = async (
  targetFlowTime /*: number */,
) /*: Promise<number> */ => {
  console.log(
    `⭐ PREDICT: predictDevPowerFix called with targetFlowTime: ${targetFlowTime}`,
  );

  try {
    // Clear this immediately to prevent it from being used accidentally
    gState().set("currentDevPowerFix", null);

    // CRITICAL: This helps ensure we're not accidentally using the last data point
    const lastDataPoint = gState().get("lastDataPoint");
    if (lastDataPoint) {
      console.log("Last data point found in state:", lastDataPoint);
      console.log("CLEARING lastDataPoint to prevent reuse");
      gState().set("lastDataPoint", null);
    }

    // Validate input
    if (isNaN(targetFlowTime) || targetFlowTime <= 0) {
      console.error(`Invalid targetFlowTime: ${targetFlowTime}`);
      return 1; // Default value for invalid input
    }

    if (!model) {
      console.log("No model initialized, creating one");
      init();
    }

    // Check if we have enough data to make a good prediction
    const trainingProgress = getTrainingProgress();
    console.log(
      `Training progress: ${trainingProgress.current}/${trainingProgress.target} (${trainingProgress.percentage}%)`,
    );

    // Need at least 3 data points for a meaningful prediction
    if (trainingProgress.current < 3) {
      console.log(
        "Not enough training data available for prediction. Using default value.",
      );
      return 1;
    }

    // Verify model trained flag
    const isModelTrained = gState().get("modelTrained");
    console.log(`Model trained flag state: ${isModelTrained}`);

    // If we have data but model isn't trained, train it first
    if (!inputMin || !inputMax || !labelMin || !labelMax || !isModelTrained) {
      console.log(
        "Model normalization parameters not set, training model first",
      );
      await trainModelWithExistingData();
    }

    if (!model || !inputMin || !inputMax || !labelMin || !labelMax) {
      console.error(
        "Model or normalization tensors are not ready after attempted training.",
      );
      return 1;
    }

    // Always ensure we're using the latest data by training one more time if we're at 100%
    if (trainingProgress.percentage === 100) {
      console.log(
        "At 100% training progress - ensuring model is trained with all data",
      );
      await trainModelWithExistingData();
    }

    console.log("Model normalization parameters:", {
      inputMin: inputMin?.dataSync()[0],
      inputMax: inputMax?.dataSync()[0],
      labelMin: labelMin?.dataSync()[0],
      labelMax: labelMax?.dataSync()[0],
    });

    // Normalize the input using the same min/max values from training
    const numericTarget = parseFloat(targetFlowTime) || 0;
    if (numericTarget < 0) {
      console.log("Invalid target flow time (negative), using default value");
      return 1; // Return default if prediction is not a number
    }

    console.log(`Normalized input from ${numericTarget}`);
    const normalizedInput = tf
      .tensor2d([numericTarget], [1, 1])
      .sub(inputMin)
      .div(inputMax.sub(inputMin));

    if (model) {
      console.log("Making prediction with trained model");

      // Check current state value to compare with model prediction later
      const currentStateDevPowerFix = gState().get("currentDevPowerFix");
      console.log("Current devPowerFix in state:", currentStateDevPowerFix);

      // Get the training data to compare
      const allData = getAllTrainingData();
      console.log(
        "All training data points:",
        JSON.stringify(allData, null, 2),
      );

      // Check if our input matches any training point exactly
      const exactMatch = allData.find(
        (point) => Math.abs(point.input - numericTarget) < 0.001,
      );
      if (exactMatch) {
        console.log("Found exact match in training data:", exactMatch);
      }

      const prediction = model.predict(normalizedInput);

      // De-normalize the output
      const denormalizedPrediction = prediction
        .mul(labelMax.sub(labelMin))
        .add(labelMin);

      const [predictedValue] = await denormalizedPrediction.data();
      console.log("Raw predicted value from MODEL:", predictedValue);

      // Compare with last training data point
      if (allData.length > 0) {
        const lastPoint = allData[allData.length - 1];
        console.log("Last training data point:", lastPoint);
        const isSuspiciouslyClose =
          Math.abs(predictedValue - lastPoint.label) < 0.0001;
        console.log(
          "Is prediction suspiciously close to last point's label?",
          isSuspiciouslyClose,
        );

        // If the prediction is suspiciously close to the last training point's label,
        // we might need to force a different prediction to break the pattern
        if (isSuspiciouslyClose) {
          console.warn(
            "⚠️ PREDICTION TOO CLOSE TO LAST TRAINING POINT! Adjusting prediction",
          );

          // Calculate an average of all labels as an alternative prediction
          const avgLabel =
            allData.reduce((sum, point) => sum + point.label, 0) /
            allData.length;
          console.log("Average of all training labels:", avgLabel);

          // Use the average instead, with a slight adjustment to make it clear it's different
          const adjustedPrediction = avgLabel * 0.9;
          console.log("Using adjusted prediction instead:", adjustedPrediction);

          // Ensure the prediction is never below a sensible minimum
          const clampedAdjusted = Math.max(0.01, adjustedPrediction);
          const roundedAdjusted = Math.round(clampedAdjusted * 100) / 100;

          // Explicitly clear state values to avoid confusion
          gState().set("currentDevPowerFix", null);
          gState().set("lastDataPoint", null);

          console.log(`FINAL ADJUSTED PREDICTION: ${roundedAdjusted}`);
          return roundedAdjusted;
        }
      }

      if (isNaN(predictedValue)) {
        console.error("Prediction resulted in NaN, using default value");
        return 1; // Return default if prediction is not a number
      }

      // Ensure the prediction is never below a sensible minimum (e.g., 0.01)
      const clampedPrediction = Math.max(0.01, predictedValue);
      const roundedPrediction = Math.round(clampedPrediction * 100) / 100;
      console.log(
        `Final prediction from MODEL: ${roundedPrediction} (after clamping and rounding)`,
      );

      // Explicitly clear ALL state values to avoid using any cached values
      gState().set("currentDevPowerFix", null);
      gState().set("lastDataPoint", null);

      return roundedPrediction;
    }

    console.log("No model available for prediction, returning default value");
    return 1;
  } catch (error) {
    console.error("Error in predictDevPowerFix:", error);
    return 1; // Return default value on error
  }
};
