// @flow
export default (
  workflowStepsIndex /*: number */,
  workflowSteps /*: Array<WorkflowSteps> */,
) /*: boolean */ => {
  return workflowStepsIndex === workflowSteps.length - 1 ? true : false;
};
