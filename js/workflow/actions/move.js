// @flow
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import anime from "../../../web_modules/animejs.js";
import gSettings from "./gSettings.js";

const move = (workFlowItem /*: Object */) /*: void */ => {
  // NOTE:
  // This might not be very clear so:
  //
  // cubes is an an array of columns of cubes.
  // Each cube object is a REFERENCE to a THREE.js Mesh object that
  // was atached to the THREE.js scene in:
  //
  //		/js/workflow/actions/pixelGrid.js (Line 34)
  //
  const speed = gSettings().speed;

  // Move cube1
  anime({
    targets: [workFlowItem.position],
    z: workFlowItem.position.z + gSettings().zCm,
    y: workFlowItem.teamNumber * gSettings().yCm + gSettings().yCm / 2,
    duration: 1000 / speed,
    delay: 0,
    easing: "easeInOutCirc",
    complete: function (anim) {
      console.log("Move complete.");
      // Move the next cube...
    },
  });
};

export default move;
