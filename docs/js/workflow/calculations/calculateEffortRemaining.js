// @flow
export default (
  previousEffortRemaining /*: number */,
  effortPerWorkflowItem /*: number */,
) /*: number */ => {
  let calculatedEffortRemaining =
    previousEffortRemaining - effortPerWorkflowItem;
  if (calculatedEffortRemaining < 0) {
    calculatedEffortRemaining = 0;
  }
  return calculatedEffortRemaining;
};
