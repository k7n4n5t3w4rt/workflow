// @flow
// --------------------------------------------------
// THREE.js
// --------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
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
      // Update the size of the valueSphere
      const collectedValue = gState().objects.workflowItems.reduce(
        collectValue,
        0,
      );
      if (gState().valueQueue.length() > 60) {
        gState().valueQueue.dequeue();
      }
      gState().valueQueue.enqueue(collectedValue);
      gState().objects.valueSphere.rollingTotal = gState().valueQueue.total();
      gState().objects.valueSphere.scale.x =
        gState().objects.valueSphere.rollingTotal;
      gState().objects.valueSphere.scale.y =
        gState().objects.valueSphere.rollingTotal;
      gState().objects.valueSphere.scale.z =
        gState().objects.valueSphere.rollingTotal;
      // Filter out the Done ones
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

const collectValue = (
  accumulator /*: number */,
  workflowItem /*: WorkflowItem */,
) /*: number */ => {
  if (
    isDone(workflowItem.workflowStatusesIndex, gSettings().workflowStatuses)
  ) {
    return (
      accumulator +
      workflowItem.effortTotal / gSettings().workflowItem.effort.max
    );
  }
  return accumulator;
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
