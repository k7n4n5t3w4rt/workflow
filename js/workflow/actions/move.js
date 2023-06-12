// @flow
//------------------------------------------------------------------
// THREE.js
//------------------------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
//------------------------------------------------------------------
// HELPERS
//------------------------------------------------------------------
import rndmPosOrNeg from "./rndmPosOrNeg.js";
import anime from "../../../web_modules/animejs.js";
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
import rndmBetween from "./rndmBetweenWhatever.js";
import flwItmTracker from "./flwItmTracker.js";

export default (flwItem /*: Object */) /*: void */ => {
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
  flwItem.dFlwStpsIndex++;
  flwItem.dEffrtRmnngCurrentStep = flwItem.dEffrtEachTouchStep;

  anime({
    targets: [flwItem.position],
    x: flwItem.dPosition.x,
    y: flwItem.dPosition.y,
    z: flwItem.dPosition.z,
    duration: 1000 / gSttngs().fps,
    delay: 0,
    easing: "easeInOutCirc",
    complete: (anim) /*: void */ => {
      flwItem.dMoving = false;
      if (gSttngs().flwSteps[flwItem.dFlwStpsIndex].status === "done") {
        flwItem.visible = false;
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
  const nextStatus = gSttngs().flwSteps[flwItem.dFlwStpsIndex + 1].status;
  let newColor = "#808080"; // Grey for "waiting" status

  if (nextStatus === "touch") {
    newColor = "#ffd700"; // Gold for "touch" status
  } else if (nextStatus === "done") {
    newColor = "#ffd700"; // Gold for "done" status
  }
  return newColor;
};

//------------------------------------------------------------------
// refineNewPosition()
//------------------------------------------------------------------
const refineNewPosition = (flwItem /*: FlwItem */) /*: ThrMeshPosition */ => {
  const range = calculateRange(flwItem.dFlwStpsIndex + 1);
  const newPosition = { ...flwItem.dPosition };
  const nextStatus = gSttngs().flwSteps[flwItem.dFlwStpsIndex + 1].status;

  // i.e. Don't do anything if the flwItem is moving into "done"
  if (nextStatus === "done") {
    newPosition.x = gState().endPosition.x;
    newPosition.y = gState().endPosition.y;
    newPosition.z = gState().endPosition.z + gState().vSphere.dRadius;
  } else {
    newPosition.x =
      gState().strtPosition.x +
      (Math.round(rndmPosOrNeg() * rndmBetween(0, range) * 100) / 100) *
        rndmPosOrNeg();
    newPosition.y =
      gState().strtPosition.y +
      (Math.round(rndmBetween(0, range) * 100) / 100) * rndmPosOrNeg();
  }
  newPosition.z -= gSttngs().step;
  return newPosition;
};

//------------------------------------------------------------------
// calculateRange()
//------------------------------------------------------------------
const calculateRange = (flwStpsIndex /*: number */) /*: number */ => {
  let range = 0;
  // Set the required space to the limit of the current step.
  // If the limit is 0, set the required space to thenumber of
  // wrkFlwItems in the current step.
  let rqrdSpace /* number */ = gSttngs().flwSteps[flwStpsIndex].limit;
  if (rqrdSpace === 0) {
    rqrdSpace = gState().flwMap[flwStpsIndex.toString()].length;
  }
  // Does this even make sense? GPT-4 told me to do it.
  // The idea is that the rate of increase decrteases as the
  // numbers get bigger
  let incrsFactor =
    rqrdSpace * gSttngs().rangeIncreaseRate * gSttngs().rangeDecreaseRate;

  range = gSttngs().scale * incrsFactor;
  // Don't let it go over the max range
  if (range > gSttngs().rangeMax) {
    range = gSttngs().rangeMax;
  }

  return range;
};
