// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
import anime from "../../../web_modules/animejs.js";
import findRadius from "../calculations/findRadius.js";
//------------------------------------------------------------------
// resizeVSphere()
//------------------------------------------------------------------
export default () => {
  if (gState().get("vQueue").total === 0) {
    return;
  }
  animateScale();
  animatePosition();
};
//------------------------------------------------------------------
// aniatePosition()
//------------------------------------------------------------------
export const animatePosition = () => {
  // If the dRadius of the vSphere is bigger than one unit of scale,
  // move the endppoint back one unit of scale
  const offset =
    Math.floor(
      (gState().get("vSphere").dRadius / gSttngs().get("step")) * 100,
    ) / 100;
  // ...but only if the offset is not a multiple of 3
  if (Math.floor(offset / gSttngs().get("step")) % 10) {
    gState().get("vSphere").dPosition.z =
      gState().get("endPosition").z - offset;
  }

  anime({
    targets: [gState().get("vSphere").position],
    z: gState().get("vSphere").dPosition.z,
    duration: 300,
    delay: 0,
    easing: "linear",
    complete: (anim) => {
      gState().get("vSphere").dMoving = false;
      gState().get("vSphere").visible = true;
    },
  });
};
//------------------------------------------------------------------
// aniateScale()
//------------------------------------------------------------------
export const animateScale = () => {
  // Create an object with a scale property that can be animated.
  let scaleObject = { scale: gState().get("vSphere").dRadius };
  const newRadius = findRadius(gState().get("vQueue").total() / 1000 / 3);
  gState().get("vSphere").dRadius = newRadius;

  if (!gState().get("vSphere").dMoving) {
    gState().get("vSphere").dMoving = true;

    // Create an animation that transitions the scale from 1.0 to 2.0 over 2 seconds.
    anime({
      targets: [scaleObject],
      scale: newRadius,
      duration: 300,
      easing: "linear",
      // Update the sphere's scale on each frame.
      update: function () {
        gState()
          .get("vSphere")
          .scale.set(scaleObject.scale, scaleObject.scale, scaleObject.scale);
      },
    });
  }
};
