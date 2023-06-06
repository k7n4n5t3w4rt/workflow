// @flow
export default (
  previousEffortRemaining /*: number */,
  effortPerWrkflwItem /*: number */,
) /*: number */ => {
  let calculatedEffortRemaining = previousEffortRemaining - effortPerWrkflwItem;
  if (calculatedEffortRemaining < 0) {
    calculatedEffortRemaining = 0;
  }
  return calculatedEffortRemaining;
};
