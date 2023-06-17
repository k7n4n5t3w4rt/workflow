// @flow
//------------------------------------------------------------------
// mysterioudWipFactor()
//------------------------------------------------------------------
export default (devUnits /*: number */, wip /*: number */) /*: boolean */ => {
  // If there is no WIP or no devs, return 0
  if (wip <= 0 || devUnits <= 0) {
    return true;
  }
  // There are plenty of devs for the WIP
  if (devUnits >= wip) {
    return false;
  }
  // Get a random number between 0 (inclusive) and 1 (exclusive)
  const random = Math.random();

  // If the random number is more than the probability (a/b), return false
  return random > devUnits / wip;
};
