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
import newSphereRadius from "../calculations/newSphereRadius.js";

const click = () /*: void */ => {
  gState().clicks++;
  // Rotate the clickCube
  anime({
    targets: [gState().objects.clickCubeGroup.clickCube.rotation],
    y: gState().objects.clickCubeGroup.clickCube.rotation.y + Math.PI / 2,
    duration: 1000,
    easing: "easeInOutSine",
    complete: () /*: void */ => {
      if (
        gState().clicks % gSettings().valueUpdateInterval === 0 ||
        gState().clicks < gSettings().valueUpdateInterval
      ) {
        filterOutDoneItems();
        resizeValueSphere();
        updateTotalsForEachWorkflowStep();
      }
      createNewWorkflowItem();
      moveAllWorkflowItems();
      click();
    },
  });
};

//--------------------------------------------------
// updateTotalsForEachWorkflowStep()
//--------------------------------------------------
const updateTotalsForEachWorkflowStep = () /*: void */ => {
  gState().objects.workflowStepTotals = {
    touchTotal: 0,
    doneTotal: gState().objects.workflowStepTotals.doneTotal,
  };
  gSettings().workflowSteps.forEach(
    (workflowStep /*: WorkflowStep */, index /*: number */) /*: void */ => {
      gState().objects.workflowStepTotals[index.toString()] = 0;
    },
  );
  gState().objects.workflowItems.forEach(
    (workflowItem /*: WorkflowItem */) /*: void */ => {
      gState().objects.workflowStepTotals[
        workflowItem.workflowStepsIndex.toString()
      ]++;
      if (
        gSettings().workflowSteps[workflowItem.workflowStepsIndex].status ===
        "touch"
      ) {
        gState().objects.workflowStepTotals.touchTotal++;
      }
    },
  );
};

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

//--------------------------------------------------
// resizeValueSphere()
//--------------------------------------------------
function resizeValueSphere() {
  gState().objects.valueSphere.rollingTotal = gState().valueQueue.total();
  const newRadius = Math.cbrt(
    gState().objects.valueSphere.rollingTotal / ((4 / 3) * Math.PI),
  );
  // Doesn't work :(
  // gState().objects.valueSphere.scale.set(newRadius, newRadius, newRadius);
  // Nor does this :(
  // gState().objects.valueSphere.scale.x = newRadius;
  // gState().objects.valueSphere.scale.y = newRadius;
  // gState().objects.valueSphere.scale.z = newRadius;
  // This does though :)
  gState().objects.valueSphere.geometry.dispose();
  gState().objects.valueSphere.geometry = new THREE.SphereGeometry(
    newRadius,
    32,
    32,
  );
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
  // Note: No need to delete the workflowItem object becase
  // it will be filtered out of the array
  if (isDone(workflowItem.workflowStepsIndex, gSettings().workflowSteps)) {
    // Filter out any workflowItems that are Done
    gState().objects.workflowStepTotals.doneTotal++;
    updateValueQueue(workflowItem.volume);
    gState().sceneData.scene.remove(
      gState().sceneData.scene.getObjectByName(workflowItem.name),
    );
    return false;
  } else if (workflowItem.age >= gSettings().death) {
    // Filter out any workflowItems that are older than a year
    return false;
  }
  return true;
};

//--------------------------------------------------
// moveWorkflowItemAndUpdateProperties()
//--------------------------------------------------
const moveWorkflowItemAndUpdateProperties = (
  workflowItem /*: WorkflowItem */,
) => {
  // First, make it a day older
  updateAgeOrRemoveFromScene(workflowItem);

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
        gState().objects.workflowStepTotals.touchTotal,
      ),
    );
  }
  return true;
};

//--------------------------------------------------
// updateAgeOrRemoveFromScene()
//--------------------------------------------------
function updateAgeOrRemoveFromScene(workflowItem) {
  if (workflowItem.age < gSettings().death) {
    workflowItem.age++;
    if (workflowItem.age <= gSettings().death && workflowItem.age % 10 === 0) {
      workflowItem.material.opacity = 1 - workflowItem.age / gSettings().death;
      workflowItem.material.needsUpdate = true;
    }
  } else {
    console.log(`WorkFlowItem ${workflowItem.name} is too old.`);
    gState().sceneData.scene.remove(
      gState().sceneData.scene.getObjectByName(workflowItem.name),
    );
  }
}

//--------------------------------------------------
// moveAllWorkflowItems()
//--------------------------------------------------
function moveAllWorkflowItems() {
  gState().objects.workflowItems.forEach(moveWorkflowItemAndUpdateProperties);
}

export default click;
