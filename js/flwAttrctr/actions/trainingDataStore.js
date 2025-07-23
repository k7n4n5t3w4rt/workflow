// @flow
/**
 * This module manages persistent storage of training data for the TensorFlow model
 * using localStorage to build up data points across multiple user sessions.
 */

/*::
type TrainingDataPoint = {
  input: number, // flowTime
  label: number  // devPowerFix
};

type TrainingDataStore = {
  version: string,
  lastUpdated: number,
  dataPoints: Array<TrainingDataPoint>
};
*/

const STORAGE_KEY = "flow-attractor-training-data";
const CURRENT_VERSION = "1"; // Increment this if the data structure changes

/**
 * Initialize the training data store with default values if it doesn't exist
 */
export const initTrainingDataStore = () /*: void */ => {
  const existingData = localStorage.getItem(STORAGE_KEY);

  if (!existingData) {
    const initialStore /*: TrainingDataStore */ = {
      version: CURRENT_VERSION,
      lastUpdated: Date.now(),
      dataPoints: [],
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialStore));
  } else {
    // Check version and migrate if needed
    const parsedData = JSON.parse(existingData);
    if (parsedData.version !== CURRENT_VERSION) {
      // In the future, add migration logic here if needed
      parsedData.version = CURRENT_VERSION;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedData));
    }
  }
};

/**
 * Get all training data points from the store
 */
export const getAllTrainingData = () /*: Array<TrainingDataPoint> */ => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      initTrainingDataStore();
      return [];
    }

    const parsedData /*: TrainingDataStore */ = JSON.parse(data);
    return parsedData.dataPoints;
  } catch (error) {
    console.error("Error getting training data:", error);
    return [];
  }
};

/**
 * Add a single training data point to the store
 */
export const addTrainingDataPoint = (
  input /*: number */,
  label /*: number */,
) /*: void */ => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      initTrainingDataStore();
    }

    const parsedData /*: TrainingDataStore */ = JSON.parse(
      data || '{"version":"1","lastUpdated":0,"dataPoints":[]}',
    );

    // Only check for duplicates if we have enough points already
    let isDuplicate = false;

    if (parsedData.dataPoints.length >= 9) {
      // Be less strict when approaching target
      // Less strict duplicate detection - only check for exact matches
      isDuplicate = parsedData.dataPoints.some((point) => {
        return point.label === label && point.input === input;
      });
    } else {
      // Check if we already have a data point with very similar label to avoid duplicates
      isDuplicate = parsedData.dataPoints.some((point) => {
        // Consider it a duplicate if the devPowerFix (label) is within 0.001
        return Math.abs(point.label - label) < 0.001;
      });
    }

    if (!isDuplicate) {
      parsedData.dataPoints.push({ input, label });
      parsedData.lastUpdated = Date.now();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedData));
      console.log(
        `Successfully stored data point: input=${input}, label=${label}`,
      );
    } else {
      console.log(
        `Skipped duplicate data point: input=${input}, label=${label}`,
      );
    }
  } catch (error) {
    console.error("Error adding training data point:", error);
  }
};

/**
 * Get the number of training data points in the store
 */
export const getTrainingDataCount = () /*: number */ => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      initTrainingDataStore();
      return 0;
    }

    const parsedData /*: TrainingDataStore */ = JSON.parse(data);
    return parsedData.dataPoints.length;
  } catch (error) {
    console.error("Error getting training data count:", error);
    return 0;
  }
};

/**
 * Clear all training data from the store
 */
export const clearTrainingData = () /*: void */ => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      initTrainingDataStore();
      return;
    }

    const parsedData /*: TrainingDataStore */ = JSON.parse(data);
    parsedData.dataPoints = [];
    parsedData.lastUpdated = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedData));
  } catch (error) {
    console.error("Error clearing training data:", error);
  }
};

/**
 * Export the training data in the format expected by the TensorFlow model
 */
export const exportTrainingDataForModel =
  () /*: {inputs: Array<number>, labels: Array<number>} */ => {
    const dataPoints = getAllTrainingData();

    return {
      inputs: dataPoints.map((point) => point.input),
      labels: dataPoints.map((point) => point.label),
    };
  };

// Initialize the store when this module is first imported
initTrainingDataStore();

export default {
  initTrainingDataStore,
  getAllTrainingData,
  addTrainingDataPoint,
  getTrainingDataCount,
  clearTrainingData,
  exportTrainingDataForModel,
};
