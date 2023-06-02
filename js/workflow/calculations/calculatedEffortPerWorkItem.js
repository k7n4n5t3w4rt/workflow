// --------------------------------------------------
// HELPERS
// --------------------------------------------------
export function calculatedEffortPerWorkItem(
  teamsNumber /*: number */,
  teamSize /*: number */,
  workFlowItemsLength /*: number */,
) {
  return (teamsNumber * teamSize) / workFlowItemsLength;
}
