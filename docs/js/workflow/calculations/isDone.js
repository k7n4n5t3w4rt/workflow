// @flow
export default (
  flwStepsIndex /*: number */,
  flwSteps /*: Array<FlwStep> */,
) /*: boolean */ => {
  return flwStepsIndex === flwSteps.length - 1 ? true : false;
};
