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
  const sceneData = globalState().sceneData;
  const cubes = globalState().cubes;
  // NOTE:
  // This might not be very clear so:
  //
  // cubes is an an array of columns of cubes.
  // Each cube object is a REFERENCE to a THREE.js Mesh object that
  // was atached to the THREE.js scene in:
  //
  //		/js/workflow/actions/pixelGrid.js (Line 34)
  //
  const speed = globalSettings().speed;

  // Move cube1
  anime({
    targets: [cubes.clickCube.rotation],
    y: cubes.clickCube.rotation.y + Math.PI / 2,
    duration: 1000,
    easing: "easeInOutSine",
    complete: function (anim) {
      const nextWorkFlowItem = workFlowItem();
      console.log("Adding a new workFlowItem: " + nextWorkFlowItem.position.x);
      sceneData.scene.add(nextWorkFlowItem);
      click();
    },
  });
  return true;
};

export default click;
