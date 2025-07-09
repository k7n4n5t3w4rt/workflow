// @flow
//------------------------------------------------------------------
// IMPORT: TENSORFLOW
//------------------------------------------------------------------
import * as tf from "@tensorflow/tfjs";

//------------------------------------------------------------------
// buildAndCompileModel()
//------------------------------------------------------------------
const buildAndCompileModel = () /*: tf.Sequential */ => {
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  model.compile({
    optimizer: "sgd",
    loss: "meanSquaredError",
  });
  return model;
};
//------------------------------------------------------------------
// trainModel()
//------------------------------------------------------------------
export const trainModel = async (
  model /*: tf.Sequential */,
  currentFlowTime /*: number */,
  targetFlowTime /*: number */,
) /*: Promise<void> */ => {
  const xs = tf.tensor2d([currentFlowTime], [1, 1]);
  const ys = tf.tensor2d([targetFlowTime], [1, 1]);
  await model.fit(xs, ys);
};
//------------------------------------------------------------------
// predictDevPowerFix()
//------------------------------------------------------------------
export const predictDevPowerFix = (
  model /*: tf.Sequential */,
  currentFlowTime /*: number */,
) /*: number */ => {
  const prediction = model.predict(tf.tensor2d([currentFlowTime], [1, 1]));
  return prediction.dataSync()[0];
};
//------------------------------------------------------------------
// init()
//------------------------------------------------------------------
export const init = () /*: tf.Sequential */ => {
  const model = buildAndCompileModel();
  return model;
};
