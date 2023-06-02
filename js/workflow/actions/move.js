// @flow
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import anime from "../../../web_modules/animejs.js";
import gSettings from "./gSettings.js";
import gState from "./gState.js";

const move = (workflowItem /*: Object */) /*: void */ => {
  // Move cube1
  let startPositionZ = workflowItem.position.z;
  if (workflowItem.workflowStatusesIndex === 0) {
    startPositionZ = gState().objects.startPosition.z;
  }
  anime({
    targets: [workflowItem.position],
    x: gState().objects.startPosition.x,
    z: startPositionZ + gSettings().zCm * 4,
    // Every team has its own row of cubes.
    y: workflowItem.teamNumber * gSettings().yCm * 2,
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
