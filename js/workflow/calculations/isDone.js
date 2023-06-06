// @flow
export default (
  wrkflwStepsIndex /*: number */,
  wrkflwSteps /*: Array<WrkflwStep> */,
) /*: boolean */ => {
  return wrkflwStepsIndex === wrkflwSteps.length - 1 ? true : false;
};
