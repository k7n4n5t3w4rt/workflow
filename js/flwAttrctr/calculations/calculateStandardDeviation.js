// @flow
export default (numbers /*: Array<number> */) /*: number */ => {
  // Step 2: Calculate the mean of the random numbers
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  const mean = sum / numbers.length;

  // Step 3: Calculate the squared differences and their sum
  const squaredDifferencesSum = numbers.reduce(
    (acc, num) => acc + Math.pow(num - mean, 2),
    0,
  );

  // Step 4: Calculate the standard deviation
  const standardDeviation = Math.sqrt(
    squaredDifferencesSum / numbers.length,
  );

  return standardDeviation;
}