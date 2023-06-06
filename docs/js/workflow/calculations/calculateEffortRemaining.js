// @flow
export default (
  previousEffortRemaining /*: number */,
  effortPerFlwItem /*: number */,
) /*: number */ => {
  let calculatedEffortRemaining = previousEffortRemaining - effortPerFlwItem;
  if (calculatedEffortRemaining < 0) {
    calculatedEffortRemaining = 0;
  }
  return calculatedEffortRemaining;
};
