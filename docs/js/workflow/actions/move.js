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
  newPosition.z = workflowItem.position.z + gSettings().stepCm;
  const newColor = {};
  newColor.r = 255;
  newColor.g = 0;
  newColor.b = 0;

  const nextWorkflowStatusesIndex = workflowItem.workflowStatusesIndex + 1;

  if (
    // If the workflowItem is currently in a Done state, we
    // want to exit gracefully
    gSettings().workflowStatuses[workflowItem.workflowStatusesIndex]
      .category === "done"
  ) {
    return;
  }

  if (
    // If the workflowItem is currently in the backlog we want to
    // start from the official starting line
    gSettings().workflowStatuses[workflowItem.workflowStatusesIndex]
      .category === "backlog"
  ) {
    newPosition.z = gState().objects.startPosition.z + gSettings().stepCm;
  }

  if (
    // If the workflowItem is moving into a touch status
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
      ((numberOfWorkflowItemsWithTheNextWorkflowStatus /
        numberOfWorkflowItems) *
        2);
    newPosition.y =
      newPosition.y *
      ((numberOfWorkflowItemsWithTheNextWorkflowStatus /
        numberOfWorkflowItems) *
        2);
  } else if (
    // If the workflowItem is moving into a done status
    gSettings().workflowStatuses[nextWorkflowStatusesIndex].category === "done"
  ) {
    newColor.r = 255;
    newColor.g = 255;
    newColor.b = 255;
    newPosition.x = gState().objects.startPosition.x;
    newPosition.y = gState().objects.startPosition.y;
    newPosition.z =
      gState().objects.startPosition.z +
      gSettings().stepCm * gSettings().workflowStatuses.length;
  }
  workflowItem.material.color = newColor;
  anime({
    targets: [workflowItem.material.color],
    r: newColor.r,
    g: newColor.g,
    b: newColor.b,
    duration: 100 / gSettings().speed,
    delay: 0,
    easing: "linear",
  });
  anime({
    targets: [workflowItem.position],
    x: newPosition.x,
    y: newPosition.y,
    z: newPosition.z,
    duration: 1000 / gSettings().speed,
    delay: 0,
    easing: "easeInOutCirc",
    complete: (anim) /*: void */ => {
      if (
        // If the workflowItem is moving into a done status
        gSettings().workflowStatuses[nextWorkflowStatusesIndex].category ===
        "done"
      ) {
        workflowItem.visible = false;
      }
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
