// @flow
export default (
  previousEffortRemaining /*: number */,
  effortPerFlwItem /*: number */,
) /*: number */ => {
  let calculatedEffrtRemaining = previousEffortRemaining - effortPerFlwItem;
  if (calculatedEffrtRemaining < 0) {
    calculatedEffrtRemaining = 0;
  }
  return calculatedEffrtRemaining;
};
