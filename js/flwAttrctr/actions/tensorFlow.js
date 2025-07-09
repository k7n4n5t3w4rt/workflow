// @flow
import * as tf from "@tensorflow/tfjs";

let model /*: tf.Sequential | null */ = null;

const buildAndCompileModel = () /*: tf.Sequential */ => {
  const newModel = tf.sequential();
  newModel.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  newModel.compile({
    optimizer: "sgd",
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

  // Mock data: As devPowerFix (label) increases, observedFlowTime (input) decreases.
  const mockInputs = [100, 80, 60, 40, 20, 10]; // Observed Flow Times
  const mockLabels = [0.5, 0.8, 1.2, 1.8, 2.5, 4.0]; // devPowerFix values

  const xs = tf.tensor2d(mockInputs, [mockInputs.length, 1]);
  const ys = tf.tensor2d(mockLabels, [mockLabels.length, 1]);

  if (model) {
    await model.fit(xs, ys, {
      epochs: 50,
      shuffle: true,
    });
  }
};

export const predictDevPowerFix = async (
  targetFlowTime /*: number */,
) /*: Promise<number> */ => {
  if (!model) {
    init();
  }

  if (model) {
    const prediction = model.predict(tf.tensor2d([targetFlowTime], [1, 1]));
    const [predictedValue] = await prediction.data();
    return predictedValue || 1;
  }

  return 1; // Return a default value if model is not available
};