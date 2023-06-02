// @flow
export default (
  workflowStatusesIndex /*: number */,
  workflowStatuses /*: Array<WorkflowStatuses> */,
) /*: boolean */ => {
  return workflowStatusesIndex === workflowStatuses.length ? true : false;
};
