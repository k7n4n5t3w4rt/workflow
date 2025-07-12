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
  const total = gState().get("vQueue").total();
  if (total === 0) {
    return;
  }
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
      gState().get("vSphere").dMoving = false;
      gState().get("vSphere").visible = true;
    },
  });
};

//------------------------------------------------------------------
// animateScale()
//------------------------------------------------------------------
const animateScale = () => {
  const dMoving = gState().get("vSphere").dMoving;
  if (dMoving === false) {
    gState().get("vSphere").dMoving = true;
    let scaleObject = { scale: gState().get("vSphere").scale.x };
    anime({
      targets: [scaleObject],
      scale: gState().get("vSphere").dRadius,
      duration: 300,
      easing: "linear",
      update: function () {
        gState()
          .get("vSphere")
          .scale.set(scaleObject.scale, scaleObject.scale, scaleObject.scale);
      },
    });
  }
};
