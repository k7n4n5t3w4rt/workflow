// @flow
export default (
  teamsNumber /*: number */,
  teamSize /*: number */,
  numberOfWrkflwItemsInTouch /*: number */,
) /*: number */ => {
  return (teamsNumber * teamSize) / numberOfWrkflwItemsInTouch;
};
