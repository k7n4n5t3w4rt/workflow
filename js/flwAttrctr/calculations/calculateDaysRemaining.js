// @flow
// Refer to copilot.md for TDD rules.
export default (
  previousDaysRemaining /*: number */,
  daysPerFlwItem /*: number */,
  numeralsAfterDecimalPoint /*: number */ = 3,
) /*: number */ => {
  let calculatedDysRmnngThisStep = previousDaysRemaining - daysPerFlwItem;
  if (calculatedDysRmnngThisStep < 0) {
    calculatedDysRmnngThisStep = 0;
  }
  // Round to the specified number of decimal places
  if (numeralsAfterDecimalPoint > 0) {
    const factor = Math.pow(10, numeralsAfterDecimalPoint);
    calculatedDysRmnngThisStep =
      Math.round(calculatedDysRmnngThisStep * factor) / factor;
  }
  return calculatedDysRmnngThisStep;
};
