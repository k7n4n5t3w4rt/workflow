// @flow
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import cube1AnimeOptions from "./cube1AnimeOptions.js";
import cube2AnimeOptions from "./cube2AnimeOptions.js";
import gSettings from "./gSettings.js";

const move = (
  workFlowItem /*: Object */,
  zCm /*: number */,
  anime /*: function */,
) /*: void */ => {
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
    x: [
      {
        value: workFlowItem.position.x,
        duration: 1000 / speed,
        delay: 0,
      },
    ],
    z: [
      {
        value: workFlowItem.position.z,
        duration: 1000 / speed,
        delay: 0,
      },
    ],
    y: [
      {
        value: workFlowItem.position.y,
        duration: 1000 / speed,
        delay: 0,
      },
    ],
    delay: 500,
    easing: "easeInOutCirc",
    complete: function (anim) {
      console.log("Move complete.");
      // Move the next cube...
    },
  });
};

export default move;
