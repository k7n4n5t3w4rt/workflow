// @flow
export default (
  previousDaysRemaining /*: number */,
  effortPerFlwItem /*: number */,
) /*: number */ => {
  let calculatedDysRmnngThisStep = previousDaysRemaining - effortPerFlwItem;
  if (calculatedDysRmnngThisStep < 0) {
    calculatedDysRmnngThisStep = 0;
  }
  return calculatedDysRmnngThisStep;
};
