// @flow
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import anime from "../../../web_modules/animejs.js";
import gSettings from "./gSettings.js";
import gState from "./gState.js";

const move = (workflowItem /*: Object */) /*: void */ => {
  // If the workflowItem is at the start of the workflowStatuses array
  // then we need to set the startPositionZ to the global start position
  let startPositionZ = workflowItem.position.z;
  if (workflowItem.workflowStatusesIndex === 0) {
    startPositionZ = gState().objects.startPosition.z;
  }
  anime({
    targets: [workflowItem.position],
    z: startPositionZ + gSettings().zCm * 4,
    duration: 1000 / gSettings().speed,
    delay: 0,
    easing: "easeInOutCirc",
    complete: function (anim) {
      // console.log("Move complete.");
      workflowItem.workflowStatusesIndex++;
    },
  });
};

export default move;
