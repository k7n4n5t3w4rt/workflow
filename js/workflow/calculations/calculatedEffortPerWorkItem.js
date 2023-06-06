// @flow
export default (
  teamsNumber /*: number */,
  teamSize /*: number */,
  numberOfFlwItemsInTouch /*: number */,
) /*: number */ => {
  return (teamsNumber * teamSize) / numberOfFlwItemsInTouch;
};
