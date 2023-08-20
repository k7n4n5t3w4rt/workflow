// @flow
export default (
  stepsIndex /*: number */,
  steps /*: Array<FlwStep> */,
) /*: boolean */ => {
  return stepsIndex === steps.length - 1 ? true : false;
};
