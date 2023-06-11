// @flow
export default (
  previousEffortRemaining /*: number */,
  effortPerFlwItem /*: number */,
) /*: number */ => {
  let calculatedEffrtRmnngCurrentStep =
    previousEffortRemaining - effortPerFlwItem;
  if (calculatedEffrtRmnngCurrentStep < 0) {
    calculatedEffrtRmnngCurrentStep = 0;
  }
  return calculatedEffrtRmnngCurrentStep;
};
