// @flow
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import anime from "../../../web_modules/animejs.js";
import gSettings from "./gSettings.js";

const move = (workFlowItem /*: Object */) /*: void */ => {
  // Move cube1
  anime({
    targets: [workFlowItem.position],
    z: workFlowItem.position.z + gSettings().zCm * 2,
    // Every team has its own row of cubes.
    y: workFlowItem.teamNumber * gSettings().yCm * 2,
    duration: 1000 / gSettings().speed,
    delay: 0,
    easing: "easeInOutCirc",
    complete: function (anim) {
      // console.log("Move complete.");
      // workFlowItem.status = gSettings().workflowStatuses[1];
    },
  });
};

export default move;
