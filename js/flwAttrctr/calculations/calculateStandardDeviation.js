function calculateStandardDeviation(max, min) {
  // Function to generate a random number between min and max (inclusive)
  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Step 1: Generate an array of 100 random numbers between min and max
  const randomNumbers = Array.from({ length: 100 }, () =>
    getRandomNumber(min, max),
  );

  // Step 2: Calculate the mean of the random numbers
  const sum = randomNumbers.reduce((acc, num) => acc + num, 0);
  const mean = sum / randomNumbers.length;

  // Step 3: Calculate the squared differences and their sum
  const squaredDifferencesSum = randomNumbers.reduce(
    (acc, num) => acc + Math.pow(num - mean, 2),
    0,
  );

  // Step 4: Calculate the standard deviation
  const standardDeviation = Math.sqrt(
    squaredDifferencesSum / randomNumbers.length,
  );

  return standardDeviation;
}

// Example usage:
const min = 20 / 340;
const max = 1;
const result = calculateStandardDeviation(max, min);
