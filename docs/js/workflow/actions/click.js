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

const click = () /*: void */ => {
  // [1] Rotate the clickCube
  anime({
    targets: [gState().objects.clickCube.rotation],
    y: gState().objects.clickCube.rotation.y + Math.PI / 2,
    duration: 1000,
    easing: "easeInOutSine",
    complete: function (anim) {
      const nextWorkFlowItem = workFlowItem();
      // [2] Add the new workFlowItem to the scene
      console.log("Adding a new workFlowItem: " + nextWorkFlowItem.position.x);
      gState().sceneData.scene.add(nextWorkFlowItem);
      // [3] Move all the workFlowItems one step forward
      gState().objects.workFlowItems.forEach((workFlowItem) => {
        // [3.1] Check if all the effort has been expended, and...
        if (workFlowItem.effortRemaining === 0) {
          // [a] Move the workFlowItem, or...
          workFlowItem.effortRemaining = workFlowItem.effortTotal;
          move(workFlowItem);
        } else {
          // [b] Decrement the effort counter
          workFlowItem.effortRemaining -= calculatedEffortPerWorkItem(
            gSettings().teamsNumber,
            gSettings().teamSize,
            gState().objects.workFlowItems.length,
          );
        }
      });
      // [4] Call click() again
      click();
    },
  });
};

// --------------------------------------------------
// HELPERS
// --------------------------------------------------
function calculatedEffortPerWorkItem(
  teamsNumber /*: number */,
  teamSize /*: number */,
  workFlowItemsLength /*: number */,
) {
  let effortPerWorkflowItem = (teamsNumber * teamSize) / workFlowItemsLength;
  return effortPerWorkflowItem;
}

export default click;
