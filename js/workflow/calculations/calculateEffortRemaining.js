export function calculateEffortRemaining(
  previousEffortRemaining /*: number */,
  effortPerWorkflowItem /*: number */,
) {
  let calculatedEffortRemaining =
    previousEffortRemaining - effortPerWorkflowItem;
  if (calculatedEffortRemaining < 0) {
    calculatedEffortRemaining = 0;
  }
  return calculatedEffortRemaining;
}
