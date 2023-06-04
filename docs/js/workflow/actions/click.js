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
import createNewWorkflowItem from "./createNewWorkflowItem.js";
import move from "./move.js";
import calculateEffortRemaining from "../calculations/calculateEffortRemaining.js";
import calculatedEffortPerWorkItem from "../calculations/calculatedEffortPerWorkItem.js";
import isDone from "../calculations/isDone.js";

const click = () /*: void */ => {
  gState().clicks++;
  // Rotate the clickCube
  anime({
    targets: [gState().objects.clickCube.rotation],
    y: gState().objects.clickCube.rotation.y + Math.PI / 2,
    duration: 1000,
    easing: "easeInOutSine",
    complete: () /*: void */ => {
      updateTotalsForEachWorkflowStep();
      createNewWorkflowItem();
      if (gState().clicks % gSettings().valueUpdateInterval === 0) {
        filterOutDoneItems();
        updateValueSphereDisplayProps();
      }
      moveAllWorkflowItems();
      click();
    },
  });
};

//--------------------------------------------------
// updateTotalsForEachWorkflowStep()
//--------------------------------------------------
const updateTotalsForEachWorkflowStep = () /*: void */ => {};

//--------------------------------------------------
// updateValueQueue()
//--------------------------------------------------
const updateValueQueue = (workflowItemValue /*: number */) /*: void */ => {
  // Collect the value of all the Done workflowItems
  if (gState().valueQueue.length() > gSettings().valueUpdateInterval) {
    gState().valueQueue.dequeue();
  }
  // const collectedValue = gState().objects.workflowItems.reduce(collectValue, 0);
  gState().valueQueue.enqueue(workflowItemValue);
};

// const collectValue = (
//   accumulator /*: number */,
//   workflowItem /*: WorkflowItem */,
// ) /*: number */ => {
//   if (
//     isDone(workflowItem.workflowStepsIndex, gSettings().workflowSteps)
//   ) {
//     return (
//       accumulator +
//       workflowItem.effortTotal / gSettings().workflowItem.effort.max
//     );
//   }
//   return accumulator;
// };

//--------------------------------------------------
// updateValueSphereDisplayProps()
//--------------------------------------------------
function updateValueSphereDisplayProps() {
  gState().objects.valueSphere.rollingTotal = gState().valueQueue.total();
  gState().objects.valueSphere.scale.x =
    gState().objects.valueSphere.rollingTotal;
  gState().objects.valueSphere.scale.y =
    gState().objects.valueSphere.rollingTotal;
  gState().objects.valueSphere.scale.z =
    gState().objects.valueSphere.rollingTotal;
}

//--------------------------------------------------
// filterOutDoneItems()
//--------------------------------------------------
function filterOutDoneItems() /*: void */ {
  gState().objects.workflowItems = gState().objects.workflowItems.filter(
    removeDoneWorkflowItems,
  );
}

const removeDoneWorkflowItems = (
  workflowItem /*: WorkflowItem */,
) /*: boolean */ => {
  // Filter out any workflowItems that are Done
  if (isDone(workflowItem.workflowStepsIndex, gSettings().workflowSteps)) {
    console.log(`WorkFlowItem ${workflowItem.name} is done.`);
    updateValueQueue(
      workflowItem.effortTotal / gSettings().workflowItem.effort.max,
    );
    gState().sceneData.scene.remove(
      gState().sceneData.scene.getObjectByName(workflowItem.name),
    );
    return false;
  }
  return true;
};

//--------------------------------------------------
// moveWorkflowItem()
//--------------------------------------------------
const moveWorkflowItem = (workflowItem /*: WorkflowItem */) => {
  // Check if all the effort has been expended...
  // ...or if the workflowItem is in a "wait" or "backlog" state
  if (
    workflowItem.effortRemaining === 0 ||
    gSettings().workflowSteps[workflowItem.workflowStepsIndex].status ===
      "wait" ||
    gSettings().workflowSteps[workflowItem.workflowStepsIndex].status ===
      "backlog"
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

//--------------------------------------------------
// moveAllWorkflowItems()
//--------------------------------------------------
function moveAllWorkflowItems() {
  gState().objects.workflowItems.forEach(moveWorkflowItem);
}

export default click;
