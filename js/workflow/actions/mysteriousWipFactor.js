// @flow
//------------------------------------------------------------------
// mysterioudWipFactor()
//------------------------------------------------------------------
export const mysteriousWipFactor = (
  devUnits /*: number */,
  WIP /*: number */,
  drag /*: number */,
) /*: boolean */ => {
  // If there is no WIP or no devs, return 0
  if (WIP === 0 || devUnits === 0) {
    return false;
  }
  const wipFactor = randomProbability(devUnits, WIP, drag);
  return wipFactor;
};
//------------------------------------------------------------------
// randomProbability()
//------------------------------------------------------------------
const randomProbability = (
  devUnits /*: number */,
  WIP /*: number */,
  drag /*: number */,
) /*: boolean */ => {
  // Check if input is valid
  if (devUnits < 0 || WIP <= 0) {
    console.error("Invalid input. Please ensure 0 <= devUnits and WIP > 0.");
    return false;
  }
  // There are plenty of devs for the WIP
  if (devUnits >= WIP) {
    return true;
  }
  // Get a random number between 0 (inclusive) and 1 (exclusive)
  const random = Math.random();

  // If the random number is less than the probability (a/b), return true
  return random < devUnits / (WIP * drag);
};
