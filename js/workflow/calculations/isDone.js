// @flow
export default (
  workflowStepsIndex /*: number */,
  workflowSteps /*: Array<WorkflowStep> */,
) /*: boolean */ => {
  return workflowStepsIndex === workflowSteps.length - 1 ? true : false;
};
