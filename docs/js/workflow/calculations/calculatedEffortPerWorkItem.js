// @flow
export default (
  teamsNumber /*: number */,
  teamSize /*: number */,
  workFlowItemsLength /*: number */,
) /*: number */ => {
  return (teamsNumber * teamSize) / workFlowItemsLength;
};
