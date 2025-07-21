// @flow
/**
 * This module encapsulates all the TensorFlow.js logic for the application.
 * Its primary purpose is to create, train, and use a simple machine learning model
 * to predict the optimal `devPowerFix` required to achieve a user-defined `targetFlowTime`.
 */
import gState from "./gState";
import * as tf from "@tensorflow/tfjs";
import {
  getAllTrainingData,
  addTrainingDataPoint,
  getTrainingDataCount,
  exportTrainingDataForModel,
} from "./trainingDataStore.js";

let model /*: tf.Sequential | null */ = null;
let inputMin, inputMax, labelMin, labelMax;
let isTraining = false;
let shouldStopTraining = false;

// How many data points we want to collect in total
const TARGET_DATA_POINTS = 100;
// How many data points to collect in one training session
const DATA_POINTS_PER_SESSION = 5;

const buildAndCompileModel = () /*: tf.Sequential */ => {
  const newModel = tf.sequential();
  newModel.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  newModel.compile({
    optimizer: tf.train.sgd(0.1), // We can use a slightly higher learning rate with normalized data
    loss: "meanSquaredError",
  });
  return newModel;
};

export const init = () => {
  if (!model) {
    model = buildAndCompileModel();
  }
};

export const cancelTraining = () /*: void */ => {
  shouldStopTraining = true;
};

export const isCurrentlyTraining = () /*: boolean */ => {
  return isTraining;
};

/*::
type TrainingProgress = {
  current: number,
  target: number,
  percentage: number
};
*/

export const getTrainingProgress = () /*: TrainingProgress */ => {
  const currentCount = getTrainingDataCount();
  return {
    current: currentCount,
    target: TARGET_DATA_POINTS,
    percentage: Math.round((currentCount / TARGET_DATA_POINTS) * 100),
  };
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
    // Check how many data points we already have
    const existingDataPoints = getTrainingDataCount();
    gState().set(
      "trainingProgress",
      Math.round((existingDataPoints / TARGET_DATA_POINTS) * 100),
    );

    // If we already have enough data points, just train the model with existing data
    if (existingDataPoints >= TARGET_DATA_POINTS) {
      await trainModelWithExistingData();
      return;
    }

    // Calculate how many more points we need
    const pointsToCollect = Math.min(
      DATA_POINTS_PER_SESSION,
      TARGET_DATA_POINTS - existingDataPoints,
    );

    // Set the minimum and maximum values for devPowerFix
    const minDevPowerFix = 0.001;
    const maxDevPowerFix = 5;

    // Choose devPowerFix values that fill gaps in our existing data
    // This is a simple approach - we could use more sophisticated methods
    const existingData = getAllTrainingData();
    const existingLabels = existingData.map((dp) => dp.label);

    // Create an array of devPowerFix values evenly spaced between min and max
    const devPowerFixValues = [];
    for (let i = 0; i < pointsToCollect; i++) {
      // Find the largest gap in our existing values
      let bestGap = 0;
      let bestValue = minDevPowerFix;

      // Sort existing labels for gap finding
      const sortedLabels = [...existingLabels].sort((a, b) => a - b);

      if (sortedLabels.length < 2) {
        // Not enough data points yet, just distribute evenly
        bestValue =
          minDevPowerFix +
          (maxDevPowerFix - minDevPowerFix) * (i / pointsToCollect);
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

    const { generateTrainingData } = await import("./generateTrainingData.js");
    const populateStepsHeadless =
      (await import("./populateStepsHeadless.js")).default ||
      (await import("./populateStepsHeadless.js")).populateStepsHeadless;
    const { headlessClickLoop } = await import("./headlessClickLoop.js");

    // Process one devPowerFix value at a time to keep the UI responsive
    for (let i = 0; i < devPowerFixValues.length; i++) {
      if (shouldStopTraining) {
        break;
      }

      // Set current devPowerFix value for UI feedback
      const currentDevPowerFix = devPowerFixValues[i];
      gState().set("currentDevPowerFix", currentDevPowerFix);

      // Generate data for this single value
      const singleValueArray = [currentDevPowerFix];
      const trainingData = await generateTrainingData(
        populateStepsHeadless,
        headlessClickLoop,
      )(singleValueArray);

      trainingData;

      // Add this data point to our persistent store
      if (trainingData.inputs.length > 0 && trainingData.inputs[0] > 0) {
        addTrainingDataPoint(trainingData.inputs[0], trainingData.labels[0]);
      }

      // Update progress
      const currentCount = getTrainingDataCount();
      gState().set(
        "trainingProgress",
        Math.round((currentCount / TARGET_DATA_POINTS) * 100),
      );

      // Small delay to let the UI breathe
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // Train the model with all the data we have so far
    await trainModelWithExistingData();
  } finally {
    isTraining = false;
    shouldStopTraining = false;
  }
};

// Helper function to train the model with existing data from store
const trainModelWithExistingData = async () => {
  const trainingData = exportTrainingDataForModel();

  // Only proceed if we have some data
  if (trainingData.inputs.length === 0) {
    console.error("No training data available");
    return;
  }

  const mockInputs = trainingData.inputs;
  const mockLabels = trainingData.labels;

  // Normalize the data to a 0-1 range to stabilize training
  const inputTensor = tf.tensor2d(mockInputs, [mockInputs.length, 1]);
  const labelTensor = tf.tensor2d(mockLabels, [mockLabels.length, 1]);

  inputMin = inputTensor.min();
  inputMax = inputTensor.max();
  labelMin = labelTensor.min();
  labelMax = labelTensor.max();

  const normalizedInputs = inputTensor
    .sub(inputMin)
    .div(inputMax.sub(inputMin));
  const normalizedLabels = labelTensor
    .sub(labelMin)
    .div(labelMax.sub(labelMin));

  if (model) {
    await model.fit(normalizedInputs, normalizedLabels, {
      epochs: 50,
      shuffle: true,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log(`Epoch ${epoch + 1}: loss = ${logs.loss}`);
        },
      },
    });
  }
};

export const predictDevPowerFix = async (
  targetFlowTime /*: number */,
) /*: Promise<number> */ => {
  if (!model) {
    init();
  }

  // Check if we have enough data to make a good prediction
  const trainingProgress = getTrainingProgress();
  if (trainingProgress.current < 3) {
    console.log(
      "Not enough training data available for prediction. Using default value.",
    );
    return 1;
  }

  // If we have data but model isn't trained, train it first
  if (!inputMin || !inputMax || !labelMin || !labelMax) {
    await trainModelWithExistingData();
  }

  if (!model || !inputMin || !inputMax || !labelMin || !labelMax) {
    console.error("Model or normalization tensors are not ready.");
    return 1;
  }

  // Normalize the input using the same min/max values from training
  const numericTarget = parseFloat(targetFlowTime) || 0;
  if (numericTarget < 0) {
    return 1; // Return default if prediction is not a number
  }
  const normalizedInput = tf
    .tensor2d([numericTarget], [1, 1])
    .sub(inputMin)
    .div(inputMax.sub(inputMin));

  if (model) {
    const prediction = model.predict(normalizedInput);

    // De-normalize the output
    const denormalizedPrediction = prediction
      .mul(labelMax.sub(labelMin))
      .add(labelMin);

    const [predictedValue] = await denormalizedPrediction.data();
    console.log("Raw predicted value:", predictedValue);

    if (isNaN(predictedValue)) {
      return 1; // Return default if prediction is not a number
    }

    // Ensure the prediction is never below a sensible minimum (e.g., 0.01)
    const clampedPrediction = Math.max(0.01, predictedValue);
    const roundedPrediction = Math.round(clampedPrediction * 100) / 100;
    return roundedPrediction;
  }

  return 1;
};
