// @flow
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import anime from "../../../web_modules/animejs.js";
import gSettings from "./gSettings.js";
import gState from "./gState.js";

const move = (workflowItem /*: Object */) /*: void */ => {
  let startPositionX = workflowItem.position.x;
  let startPositionY = workflowItem.position.y;
  let startPositionZ = workflowItem.position.z;
  // If the workflowItem is at the start of the workflowStatuses array
  // then we need to set the startPositionZ to the global start position
  if (workflowItem.workflowStatusesIndex === 0) {
    startPositionZ = gState().objects.startPosition.z;
  } else if (
    // If the workflowItem is in a touch status
    gSettings().workflowStatuses[workflowItem.workflowStatusesIndex]
      .category === "touch"
  ) {
    const numberOfWorkflowItemsWithThisWorkflowStatus =
      gState().objects.workflowItems.reduce(
        findWorkflowItemsWithTheSameStatus(workflowItem.workflowStatusesIndex),
        0,
      );
    const numberOfWorkflowItems = gState().objects.workflowItems.length;
    startPositionX =
      (startPositionX * numberOfWorkflowItemsWithThisWorkflowStatus) /
      numberOfWorkflowItems;
    startPositionY =
      (startPositionY * numberOfWorkflowItemsWithThisWorkflowStatus) /
      numberOfWorkflowItems;
  }
  anime({
    targets: [workflowItem.position],
    x: startPositionX,
    y: startPositionY,
    z: startPositionZ + gSettings().zCm * 2,
    duration: 1000 / gSettings().speed,
    delay: 0,
    easing: "easeInOutCirc",
    complete: function (anim) {
      // console.log("Move complete.");
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
