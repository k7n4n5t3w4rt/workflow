// @flow
/**
 * This module encapsulates all the TensorFlow.js logic for the application.
 * Its primary purpose is to create, train, and use a simple machine learning model
 * to predict the optimal `devPowerFix` required to achieve a user-defined `targetFlowTime`.
 */
import gState from "./gState";
import * as tf from "@tensorflow/tfjs";

let model /*: tf.Sequential | null */ = null;
let inputMin, inputMax, labelMin, labelMax;

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

export const trainModel = async () /*: Promise<void> */ => {
  if (!model) {
    init();
  }

  // Step 1: Decide how many values you want to generate
  const numValues = 3;

  // Step 2: Set the minimum and maximum values for devPowerFix
  const minDevPowerFix = 0.001;
  // Set the current devPowerFix for UI feedback
  gState().set("currentDevPowerFix", minDevPowerFix);
  const maxDevPowerFix = 2;

  // Step 3: Generate an array of devPowerFix values evenly spaced between min and max
  const devPowerFixValues = Array.from(
    { length: numValues },
    (_, i) =>
      minDevPowerFix +
      (maxDevPowerFix - minDevPowerFix) * (i / (numValues - 1)),
  );
  const { generateTrainingData } = await import("./generateTrainingData.js");
  const populateStepsHeadless =
    (await import("./populateStepsHeadless.js")).default ||
    (await import("./populateStepsHeadless.js")).populateStepsHeadless;
  const { headlessClickLoop } = await import("./headlessClickLoop.js");
  const trainingData = await generateTrainingData(
    populateStepsHeadless,
    headlessClickLoop,
  )(devPowerFixValues);
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
