// @flow
export default (
  teamsNumber /*: number */,
  teamSize /*: number */,
  workflowItemsLength /*: number */,
) /*: number */ => {
  return (teamsNumber * teamSize) / workflowItemsLength;
};
