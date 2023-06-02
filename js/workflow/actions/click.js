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
import workFlowItem from "./workflowItem.js";
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
      // [2] Add the new workFlowItem to the scene
      const nextWorkFlowItem = workFlowItem();
      gState().sceneData.scene.add(nextWorkFlowItem);
      // [3] Move all the workFlowItems one step forward
      gState().objects.workFlowItems =
        gState().objects.workFlowItems.filter(moveWorkflowItems);
      // [4] Call click() again
      click();
    },
  });
};

const moveWorkflowItems = (workFlowItem /*: WorkflowItem */) => {
  // Filter out any workFlowItems that are Done
  if (
    isDone(workFlowItem.workflowStatusesIndex, gSettings().workflowStatuses)
  ) {
    console.log(`WorkFlowItem ${workFlowItem.name} is done.`);
    gState().sceneData.scene.remove(
      gState().sceneData.scene.getObjectByName(workFlowItem.name),
    );
    return false;
  }
  // [3.1] Check if all the effort has been expended...
  // ...or if the workFlowItem is in a "wait" state
  if (
    workFlowItem.effortRemaining === 0 ||
    gSettings().workflowStatuses[workFlowItem.workflowStatusesIndex]
      .category === "wait"
  ) {
    // ...move the workFlowItem, or...
    workFlowItem.effortRemaining = workFlowItem.effortTotal;
    move(workFlowItem);
  } else {
    // ...decrement the effort counter
    workFlowItem.effortRemaining = calculateEffortRemaining(
      workFlowItem.effortRemaining,
      calculatedEffortPerWorkItem(
        gSettings().teamsNumber,
        gSettings().teamSize,
        gState().objects.workFlowItems.length,
      ),
    );
  }
  return true;
};
export default click;
