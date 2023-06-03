// @flow
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import anime from "../../../web_modules/animejs.js";
import gSettings from "./gSettings.js";
import gState from "./gState.js";

const move = (
  workflowItem /*: Object */,
  newPosition /*: SimplePosition */,
  newColor /*: CubeColor */,
) /*: void */ => {
  anime({
    targets: [workflowItem.position],
    x: newPosition.x,
    y: newPosition.y,
    z: newPosition.z,
    duration: 1000 / gSettings().speed,
    delay: 0,
    easing: "easeInOutCirc",
    complete: setWorkflowItemColor(
      workflowItem,
      newColor.r,
      newColor.g,
      newColor.b,
    ),
  });
};

const findWorkflowItemsWithTheSameStatus =
  (workflowStatusesIndex /*: number */) /*: function */ =>
  (
    accumulator /*: number */,
    currentWorkflowItem /*: WorkflowItem */,
  ) /*: number */ => {
    if (currentWorkflowItem.workflowStatusesIndex === workflowStatusesIndex) {
      accumulator++;
    }
    return accumulator;
  };

const setWorkflowItemColor =
  (
    workflowItem /*: WorkflowItem */,
    newRColor /*: number */,
    newGColor /*: number */,
    newBColor /*: number */,
  ) /*: function */ =>
  (anim) /*: void */ => {
    const nextWorkflowStatusesIndex = workflowItem.workflowStatusesIndex + 1;

    if (
      // If the workflowItem is in a touch status
      nextWorkflowStatusesIndex < gSettings().workflowStatuses.length &&
      gSettings().workflowStatuses[nextWorkflowStatusesIndex].category ===
        "touch"
    ) {
      newRColor = 0;
      newGColor = 255;
      newBColor = 0;
    } else if (
      // If the workflowItem is in a backlog status
      nextWorkflowStatusesIndex < gSettings().workflowStatuses.length &&
      gSettings().workflowStatuses[nextWorkflowStatusesIndex].category ===
        "backlog"
    ) {
      newRColor = 255;
      newGColor = 255;
      newBColor = 255;
    } else if (
      // If the workflowItem is in a wait status
      nextWorkflowStatusesIndex < gSettings().workflowStatuses.length &&
      gSettings().workflowStatuses[nextWorkflowStatusesIndex].category ===
        "wait"
    ) {
      newRColor = 255;
      newGColor = 0;
      newBColor = 0;
    }

    workflowItem.material.color.r = newRColor;
    workflowItem.material.color.g = newGColor;
    workflowItem.material.color.b = newBColor;
    workflowItem.workflowStatusesIndex++;
  };
export default move;
