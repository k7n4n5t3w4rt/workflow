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
import workFlowItem from "./workFlowItem.js";
import move from "./move.js";

const click = () /*: void */ => {
  // [1] Rotate the clickCube
  anime({
    targets: [gState().cubes.clickCube.rotation],
    y: gState().cubes.clickCube.rotation.y + Math.PI / 2,
    duration: 1000,
    easing: "easeInOutSine",
    complete: function (anim) {
      const nextWorkFlowItem = workFlowItem();
      // [2] Add the new workFlowItem to the scene
      console.log("Adding a new workFlowItem: " + nextWorkFlowItem.position.x);
      gState().sceneData.scene.add(nextWorkFlowItem);
      // [3] Move all the workFlowItems one step forward
      gState().cubes.workFlowItems.forEach((workFlowItem) => {
        // [3.1] Check if all the effort has been expended, and...
        if (workFlowItem.effort === 0) {
          // [a] Move the workFlowItem, or...
          move(workFlowItem);
        } else {
          // [b] Decrement the effort counter
          workFlowItem.effort--;
        }
      });
      // [4] Call click() again
      click();
    },
  });
};

export default click;
