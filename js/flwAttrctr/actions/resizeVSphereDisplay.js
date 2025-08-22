// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import anime from "animejs";

//------------------------------------------------------------------
// resizeVSphereDisplay()
//------------------------------------------------------------------
export const resizeVSphereDisplay = () => {
  // const totalVolume = gState().get("vSphere").dRllngTtlVolume || 0;
  // if (totalVolume <= 0) {
  //   return;
  // }
  animateScale();
  animatePosition();
};
export default resizeVSphereDisplay;

//------------------------------------------------------------------
// animatePosition()
//------------------------------------------------------------------
const animatePosition = () => {
  anime({
    targets: [gState().get("vSphere").position],
    z: gState().get("vSphere").dPosition.z,
    duration: 300,
    delay: 0,
    easing: "linear",
    complete: (anim) => {
      // CHANGED: Do not flip dMoving here; scaling animation will reset it on completion
      gState().get("vSphere").visible = true;
    },
  });
};

//------------------------------------------------------------------
// animateScale()
//------------------------------------------------------------------
const animateScale = () => {
  // Use typed vSphere so Flow will check the presence and type of dMoving
  const vSphere /*: VSphere */ = gState().get("vSphere");
  const isMoving /*: boolean */ = vSphere.dMoving;
  if (isMoving === false) {
    vSphere.dMoving = true;

    // CHANGED: Use absolute target scale based on geometry base radius, not ratio of radii
    const baseRadius /*: number */ =
      gState().get("vSphere").geometry.parameters.radius;
    // console.log("baseRadius =", baseRadius);
    const targetScale /*: number */ =
      gState().get("vSphere").dNewRadius / baseRadius;
    // console.log("targetScale =", targetScale);

    // Keep animating a plain object and apply to THREE.Vector3 in update
    let scaleObject = { scale: gState().get("vSphere").scale.x };
    anime({
      targets: [scaleObject],
      scale: targetScale, // Absolute scale target
      duration: 300,
      easing: "linear",
      update: function () {
        gState()
          .get("vSphere")
          .scale.set(scaleObject.scale, scaleObject.scale, scaleObject.scale);
        // console.log("Scaled sphere to:", scaleObject.scale);
      },
      complete: () => {
        // CHANGED: Update stored radius and now reset dMoving when scaling finishes
        vSphere.dRadius = gState().get("vSphere").dNewRadius;
        vSphere.dMoving = false;
      },
    });
  }
};
