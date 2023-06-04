// @flow
export default (
  teamsNumber /*: number */,
  teamSize /*: number */,
  numberOfWorkflowItemsInTouch /*: number */,
) /*: number */ => {
  return (teamsNumber * teamSize) / numberOfWorkflowItemsInTouch;
};
