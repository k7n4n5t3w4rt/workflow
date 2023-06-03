// @flow
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import anime from "../../../web_modules/animejs.js";
import gSettings from "./gSettings.js";
import gState from "./gState.js";

const move = (workflowItem /*: Object */) /*: void */ => {
  const newPosition = {};
  newPosition.x = workflowItem.position.x;
  newPosition.y = workflowItem.position.y;
  newPosition.z = workflowItem.position.z + gSettings().zCm * 4;
  const newColor = {};
  newColor.r = 255;
  newColor.g = 0;
  newColor.b = 0;

  const nextWorkflowStatusesIndex = workflowItem.workflowStatusesIndex + 1;

  if (
    // If the workflowItem is moving into a touch status
    gSettings().workflowStatuses[workflowItem.workflowStatusesIndex]
      .category === "backlog"
  ) {
    newPosition.z = gState().objects.startPosition.z + gSettings().zCm * 2;
  }

  if (
    // If the workflowItem is moving into a touch status
    gSettings().workflowStatuses[nextWorkflowStatusesIndex] !== undefined &&
    gSettings().workflowStatuses[nextWorkflowStatusesIndex].category === "touch"
  ) {
    newColor.r = 0;
    newColor.g = 255;
    newColor.b = 0;
    const numberOfWorkflowItemsWithTheNextWorkflowStatus =
      gState().objects.workflowItems.reduce(
        findWorkflowItemsWithTheSameStatus(
          workflowItem.workflowStatusesIndex + 1,
        ),
        0,
      );
    const numberOfWorkflowItems = gState().objects.workflowItems.length;
    newPosition.x =
      newPosition.x *
      (numberOfWorkflowItemsWithTheNextWorkflowStatus / numberOfWorkflowItems);
    newPosition.y =
      newPosition.y *
      (numberOfWorkflowItemsWithTheNextWorkflowStatus / numberOfWorkflowItems);
  } else if (
    // If the workflowItem is moving into a done status
    gSettings().workflowStatuses[nextWorkflowStatusesIndex] !== undefined &&
    gSettings().workflowStatuses[nextWorkflowStatusesIndex].category ===
      "complete"
  ) {
    newColor.r = 255;
    newColor.g = 255;
    newColor.b = 255;
    newPosition.x = 0;
    newPosition.y = 0;
    newPosition.z = workflowItem.position.z + gSettings().zCm * 8;
  }
  workflowItem.material.color = newColor;
  anime({
    targets: [workflowItem.position],
    x: newPosition.x,
    y: newPosition.y,
    z: newPosition.z,
    duration: 1000 / gSettings().speed,
    delay: 0,
    easing: "easeInOutCirc",
    complete: (anim) /*: void */ => {
      workflowItem.workflowStatusesIndex++;
    },
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

export default move;
