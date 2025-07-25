// @flow
/**
 * This module provides functionality for tracking training progress
 * in the TensorFlow.js model training process.
 */
import { getTrainingDataCount } from "./trainingDataStore.js";

// How many data points we want to collect in each stage
// Reduced from 100 to 10 for better precision with less data
export const TARGET_DATA_POINTS = 10;

/*::
type TrainingProgress = {
  current: number,
  target: number,
  percentage: number
};
*/

/**
 * Returns the current progress of the training data collection
 * @returns {TrainingProgress} Object with current count, target count, and percentage complete
 */
const getTrainingProgress = () /*: TrainingProgress */ => {
  const currentCount = getTrainingDataCount();
  return {
    current: currentCount,
    target: TARGET_DATA_POINTS,
    percentage: Math.round((currentCount / TARGET_DATA_POINTS) * 100),
  };
};

export default getTrainingProgress;
