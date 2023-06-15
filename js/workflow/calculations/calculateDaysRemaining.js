// @flow
export default (
  previousDaysRemaining /*: number */,
  daysPerFlwItem /*: number */,
) /*: number */ => {
  let calculatedDysRmnngThisStep = previousDaysRemaining - daysPerFlwItem;
  if (calculatedDysRmnngThisStep < 0) {
    calculatedDysRmnngThisStep = 0;
  }
  return calculatedDysRmnngThisStep;
};
