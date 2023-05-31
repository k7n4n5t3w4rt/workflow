// @flow
// --------------------------------------------------
// GLOBALS
// --------------------------------------------------
import globalSettings from "./globalSettings.js";
import globalState from "./globalState.js";
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import anime from "../../../web_modules/animejs.js";
import workFlowItem from "./workFlowItem.js";

const click = () /*: boolean */ => {
  // [1] Rotate the clickCube
  anime({
    targets: [globalState().cubes.clickCube.rotation],
    y: globalState().cubes.clickCube.rotation.y + Math.PI / 2,
    duration: 1000,
    easing: "easeInOutSine",
    complete: function (anim) {
      const nextWorkFlowItem = workFlowItem();
      // [2] Add the new workFlowItem to the scene
      console.log("Adding a new workFlowItem: " + nextWorkFlowItem.position.x);
      globalState().sceneData.scene.add(nextWorkFlowItem);
      // [3] Do some other stuff
      // [4] Call click() again
      click();
    },
  });
  return true;
};

export default click;
