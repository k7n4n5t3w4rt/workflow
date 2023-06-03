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
  // Rotate the clickCube
  anime({
    targets: [gState().objects.clickCube.rotation],
    y: gState().objects.clickCube.rotation.y + Math.PI / 2,
    duration: 1000,
    easing: "easeInOutSine",
    complete: function (anim) {
      // Get the new workflowItem
      const nextWorkFlowItem = workflowItem();
      // Add the new workflowItem to the array of all workflowItems
      gState().objects.workflowItems.push(nextWorkFlowItem);
      // Add the new workflowItem to the scene
      gState().sceneData.scene.add(nextWorkFlowItem);
      // Filter out workflowItems in the Done status
      gState().objects.workflowItems = gState().objects.workflowItems.filter(
        removeDoneWorkflowItems,
      );
      // Move all the remaining workflowItems
      gState().objects.workflowItems.forEach(moveWorkflowItems);
      // Call click() again
      click();
    },
  });
};

const removeDoneWorkflowItems = (
  workflowItem /*: WorkflowItem */,
) /*: boolean */ => {
  // Filter out any workflowItems that are Done
  if (
    isDone(workflowItem.workflowStatusesIndex, gSettings().workflowStatuses)
  ) {
    console.log(`WorkFlowItem ${workflowItem.name} is done.`);
    gState().sceneData.scene.remove(
      gState().sceneData.scene.getObjectByName(workflowItem.name),
    );
    gState().objects.valueSphere.geometry.scale(
      gState().objects.valueSphere.scale.x + 1 / workflowItem.effortTotal,
      gState().objects.valueSphere.scale.y + 1 / workflowItem.effortTotal,
      gState().objects.valueSphere.scale.z + 1 / workflowItem.effortTotal,
    );
    return false;
  }
  return true;
};

const moveWorkflowItems = (workflowItem /*: WorkflowItem */) => {
  // Check if all the effort has been expended...
  // ...or if the workflowItem is in a "wait" or "backlog" state
  if (
    workflowItem.effortRemaining === 0 ||
    gSettings().workflowStatuses[workflowItem.workflowStatusesIndex]
      .category === "wait" ||
    gSettings().workflowStatuses[workflowItem.workflowStatusesIndex]
      .category === "backlog"
  ) {
    // Move the workflowItem
    move(workflowItem);
    // Reset the effort counter
    workflowItem.effortRemaining = workflowItem.effortTotal;
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
