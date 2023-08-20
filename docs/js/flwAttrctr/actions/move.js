// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import anime from "../../../web_modules/animejs.js";
import flwItmTracker from "./flwItmTracker.js";
import calculateRange from "./calculateRange.js";
import rndmPosOrNeg from "./rndmPosOrNeg.js";
import animateScaleToZero from "./animateScaleToZero.js";
import rndmBetween from "./rndmBetweenWhatever.js";
import removeFlowItem from "./removeFlowItem.js";
import calculateZPosFromStep from "./calculateZPosFromStep.js";

export default (flwItem /*: Object */) /*: void */ => {
  // gState().get("flwItmTracker")[flwItem.name].unshift(`Moving`);
  animateColorChange(flwItem, newColor(flwItem));
  flwItem.dPosition = { ...refineNewPosition(flwItem) };
  animatePositionChange(flwItem);
};

//------------------------------------------------------------------
// animatePositionChange()
//------------------------------------------------------------------
const animatePositionChange = (flwItem /*: FlwItem */) /*: void */ => {
  // Set the properties of the flwItem to the state they'll
  // should be in when the animation is complete.
  flwItem.dMoving = true;
  flwItem.dStpIndex++;
  // We don't want to reset the days remaining if the item is
  // in the last step, i.e. Done
  if (flwItem.dStpIndex < gSttngs().get("steps").length - 1) {
    flwItem.dDysRmnngThisStep = flwItem.dDysEachTouchStep;
  }

  anime({
    targets: [flwItem.position],
    x: flwItem.dPosition.x,
    y: flwItem.dPosition.y,
    z: flwItem.dPosition.z,
    duration: 1000 / (gSttngs().get("fps") >= 1 ? gSttngs().get("fps") : 1),
    delay: 0,
    easing: "easeInOutCirc",
    complete: (anim) /*: void */ => {
      flwItem.dMoving = false;
      if (gSttngs().get("steps")[flwItem.dStpIndex].status === "done") {
        flwItem.visible = false;
        removeFlowItem(flwItem);
      } else {
      }
    },
  });
};

//------------------------------------------------------------------
// animateColorChange()
//------------------------------------------------------------------
const animateColorChange = (
  flwItem /*: FlwItem */,
  newColor /*: string */,
) /*: void */ => {
  // Create an object with a color property that can be animated.
  let oldColor = { color: flwItem.dColor };
  flwItem.dColor = newColor;

  anime({
    targets: oldColor,
    color: newColor,
    duration: 1000,
    easing: "linear",
    // Update the cube's material color on each frame.
    update: function () {
      let color = new THREE.Color(oldColor.color);
      flwItem.material.color.copy(color);
      flwItem.material.needsUpdate = true;
    },
  });
};

//------------------------------------------------------------------
// newColor()
//------------------------------------------------------------------
const newColor = (flwItem /*: FlwItem */) /*: string */ => {
  const nextStatus = gSttngs().get("steps")[flwItem.dStpIndex + 1].status;
  let newColor = "#" + gSttngs().get("colorGrey"); // Grey for "waiting" status

  if (nextStatus === "touch" || nextStatus === "done") {
    newColor = "#" + gSttngs().get("colorGold"); // Gold for "touch" status
    if (flwItem.dExpedite == true) {
      newColor = "#" + gSttngs().get("colorGreen"); // Green for "touch" status
    }
  }
  return newColor;
};

//------------------------------------------------------------------
// refineNewPosition()
//------------------------------------------------------------------
const refineNewPosition = (flwItem /*: FlwItem */) /*: ThrMeshPosition */ => {
  const range = calculateRange(flwItem.dStpIndex + 1);
  const newPosition = { ...flwItem.dPosition };
  const nextStatus = gSttngs().get("steps")[flwItem.dStpIndex + 1].status;

  if (nextStatus === "done") {
    newPosition.x = gState().get("vSphere").dPosition.x;
    newPosition.y = gState().get("vSphere").dPosition.y;
    newPosition.z = gState().get("endPosition").z;

    animateScaleToZero(flwItem);
  } else {
    newPosition.x =
      gState().get("strtPosition").x +
      (Math.round(rndmPosOrNeg() * rndmBetween(0, range) * 100) / 100) *
        rndmPosOrNeg();
    newPosition.y =
      gState().get("strtPosition").y +
      (Math.round(rndmBetween(0, range) * 100) / 100) * rndmPosOrNeg();
    newPosition.z = calculateZPosFromStep(flwItem.dStpIndex + 1);
  }
  return newPosition;
};
