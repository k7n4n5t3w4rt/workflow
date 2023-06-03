// @flow
// --------------------------------------------------
// GLOBALS
// --------------------------------------------------
import gSettings from "./gSettings.js";
import gState from "./gState.js";
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import anime from "../../../web_modules/animejs.js";
import workflowItem from "./workflowItem.js";
import move from "./move.js";
import calculateEffortRemaining from "../calculations/calculateEffortRemaining.js";
import calculatedEffortPerWorkItem from "../calculations/calculatedEffortPerWorkItem.js";
import isDone from "../calculations/isDone.js";

const click = () /*: void */ => {
  // [1] Rotate the clickCube
  anime({
    targets: [gState().objects.clickCube.rotation],
    y: gState().objects.clickCube.rotation.y + Math.PI / 2,
    duration: 1000,
    easing: "easeInOutSine",
    complete: function (anim) {
      // [2] Add the new workflowItem to the scene
      const nextWorkFlowItem = workflowItem();
      gState().sceneData.scene.add(nextWorkFlowItem);
      // [3] Move all the workflowItems one step forward
      gState().objects.workflowItems =
        gState().objects.workflowItems.filter(moveWorkflowItems);
      // [4] Call click() again
      click();
    },
  });
};

const moveWorkflowItems = (workflowItem /*: WorkflowItem */) => {
  // Filter out any workflowItems that are Done
  if (
    isDone(workflowItem.workflowStatusesIndex, gSettings().workflowStatuses)
  ) {
    console.log(`WorkFlowItem ${workflowItem.name} is done.`);
    gState().sceneData.scene.remove(
      gState().sceneData.scene.getObjectByName(workflowItem.name),
    );
    return false;
  }
  // [3.1] Check if all the effort has been expended...
  // ...or if the workflowItem is in a "wait" state
  if (
    workflowItem.effortRemaining === 0 ||
    gSettings().workflowStatuses[workflowItem.workflowStatusesIndex]
      .category === "wait"
  ) {
    // ...move the workflowItem, or...
    workflowItem.effortRemaining = workflowItem.effortTotal;

    // Some defaults
    const newPosition = {
      x: workflowItem.position.x,
      y: workflowItem.position.y,
      z: workflowItem.position.z + gSettings().zCm * 3,
    };

    const newColor = {
      r: workflowItem.material.color.r,
      g: workflowItem.material.color.g,
      b: workflowItem.material.color.b,
    };

    // // If the workflowItem is at the end of the workflowStatuses array
    // const nextWorkflowStatusesIndex = workflowItem.workflowStatusesIndex + 1;
    // // If the workflowItem is at the start of the workflowStatuses array
    // // then we need to set the endPositionZ to the global start position
    // if (
    //   // If the workflowItem is moving into a touch status
    //   nextWorkflowStatusesIndex < gSettings().workflowStatuses.length &&
    //   gSettings().workflowStatuses[nextWorkflowStatusesIndex].category === "touch"
    // ) {
    //   const numberOfWorkflowItemsWithTheNextWorkflowStatus =
    //     gState().objects.workflowItems.reduce(
    //       findWorkflowItemsWithTheSameStatus(
    //         workflowItem.workflowStatusesIndex + 1,
    //       ),
    //       0,
    //     );
    //   const numberOfWorkflowItems = gState().objects.workflowItems.length;
    //   endPositionX =
    //     (endPositionX * numberOfWorkflowItemsWithTheNextWorkflowStatus) /
    //     numberOfWorkflowItems;
    //   endPositionY =
    //     (endPositionY * numberOfWorkflowItemsWithTheNextWorkflowStatus) /
    //     numberOfWorkflowItems;
    // } else if (
    //   nextWorkflowStatusesIndex < gSettings().workflowStatuses.length &&
    //   gSettings().workflowStatuses[nextWorkflowStatusesIndex].category === "done"
    // ) {
    //   endPositionX = gState().objects.startPosition.x;
    //   endPositionY = gState().objects.startPosition.y;
    // }

    move(workflowItem, newPosition, newColor);
  } else {
    // ...decrement the effort counter
    workflowItem.effortRemaining = calculateEffortRemaining(
      workflowItem.effortRemaining,
      calculatedEffortPerWorkItem(
        gSettings().teamsNumber,
        gSettings().teamSize,
        gState().objects.workflowItems.length,
      ),
    );
  }
  return true;
};
export default click;
