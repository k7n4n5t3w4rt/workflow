// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
import anime from "animejs";
import findRadius from "../calculations/findRadius.js";
import calculateEndPositionZ from "./calculateEndPositionZ.js";
//------------------------------------------------------------------
// resizeVSphere()
//------------------------------------------------------------------
export const resizeVSphere = () => {
  const total = gState().get("vQueue").total();
  if (total === 0) {
    return;
  }
  animateScale();
  animatePosition();
};
export default resizeVSphere;
//------------------------------------------------------------------
// aniatePosition()
//------------------------------------------------------------------
export const animatePosition = () => {
  // If the dRadius of the vSphere is bigger than one unit of scale,
  // move the endppoint back one unit of scale
  const offset =
    (Math.floor(
      (gState().get("vSphere").dRadius / gSttngs().get("step")) * 100,
    ) /
      100) *
    gSttngs().get("step");
  // ...but only if the offset is not a multiple of 3
  // if (Math.floor(offset / gSttngs().get("step")) % 3) {
  // The `z` inded of theoriginal endpoint is two steps on from the
  // last step. It is negative so it comes towards the camera:
  //  gSttngs().get("step") * (gSttngs().get("steps").length + 2) * -1
  gState().get("vSphere").dPosition.z = calculateEndPositionZ() - offset;
  // }

  anime({
    targets: [gState().get("vSphere").position],
    z: gState().get("vSphere").dPosition.z,
    duration: 300,
    delay: 0,
    easing: "linear",
    complete: (anim) => {
      gState().get("vSphere").dMoving = false;
      gState().get("vSphere").visible = true;
      gState().get("endPosition").z = calculateEndPositionZ() - offset;
    },
  });
};
//------------------------------------------------------------------
// aniateScale()
//------------------------------------------------------------------
export const animateScale = () => {
  const scale = gSttngs().get("scale") || 0.07;
  const dRadius = gState().get("vSphere").dRadius || scale;
  const total = gState().get("vQueue").total() || 1;
  // Create an object with a scale property that can be animated
  let scaleObject = { scale: dRadius };
  // Calculate the new radius based on the number of Done items
  const valueScaled = (total * scale) / 10;
  const newRadius = valueScaled / 1.0;
  // Store the new radius in a data property
  gState().get("vSphere").dRadius = newRadius;
  // If the sphere is not moving, animate it
  const dMoving = gState().get("vSphere").dMoving;
  if (dMoving === false) {
    gState().get("vSphere").dMoving = true;
    // Create an animation that transitions the scale
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
