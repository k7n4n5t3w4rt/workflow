// @flow
// --------------------------------------------------
// THREE.js
// --------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import rndmPosOrNeg from "./rndmPosOrNeg.js";
import anime from "../../../web_modules/animejs.js";
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
import rndmBetween from "./rndmBetweenWhatever.js";

const move = (
  flwItem /*: Object */,
  flwStpsIndex /*: number */,
) /*: void */ => {
  const newPosition = refineNewPosition(
    flwItem,
    flwStpsIndex + 1,
    flwItem.dPosition,
    gState().strtPosition,
    gSttngs().flwSteps.length,
    range(gSttngs().scale, gSttngs().flwSteps[flwStpsIndex + 1].limit),
  );
  newPosition.z -= gSttngs().step;

  let newColor = "#808080"; // Grey for "waiting" status

  const nextStatus = gSttngs().flwSteps[flwStpsIndex + 1].status;

  if (nextStatus === "touch") {
    newColor = "#ffd700"; // Gold for "touch" status
  } else if (nextStatus === "done") {
    newColor = "#ffd700"; // Gold for "done" status
    newPosition.x = gState().endPosition.x;
    newPosition.y = gState().endPosition.y;
    newPosition.z = gState().endPosition.z + gState().vSphere.dRadius;
  }

  // Create an object with a color property that can be animated.
  let colorObject = { color: flwItem.dColor };
  flwItem.dColor = newColor;

  // Create an animation that transitions the color from green to red over 2 seconds.
  anime({
    targets: colorObject,
    color: newColor,
    duration: 1000,
    easing: "linear",
    // Update the cube's material color on each frame.
    update: function () {
      let color = new THREE.Color(colorObject.color);
      flwItem.material.color.copy(color);
      flwItem.material.needsUpdate = true;
    },
  });

  // Update the data properties first, independently of the animation
  flwItem.dPosition.x = newPosition.x;
  flwItem.dPosition.y = newPosition.y;
  flwItem.dPosition.z = newPosition.z;

  flwItem.dMoving = true;

  anime({
    targets: [flwItem.position],
    x: newPosition.x,
    y: newPosition.y,
    z: newPosition.z,
    duration: 1000 / gSttngs().speed,
    delay: 0,
    easing: "easeInOutCirc",
    complete: (anim) /*: void */ => {
      flwItem.dMoving = false;
      if (
        // If the flwItem has moved into a done status
        nextStatus === "done"
      ) {
        flwItem.visible = false;
      } else {
        flwItem.dFlwStpsIndex++;
        flwItem.dEffrtRemaining = flwItem.dEffrtTotal;
      }
    },
  });
};

//--------------------------------------------------
// range()
//--------------------------------------------------
const range = (
  gScale /*: number */,
  gNumberOfFlwItemsNextStatus /*: number */,
) /*: number */ => {
  let range = 0;

  if (gNumberOfFlwItemsNextStatus > 0) {
    const increaseDecreaseRate = 0.95; // Modify this value to change the rate of decrease

    // Does this even make sense? GPT-4 told me to do it.
    let calculatedIncreaseRate =
      gNumberOfFlwItemsNextStatus *
      gSttngs().rangeIncreaseRate *
      gSttngs().rangeDecreaseRate;

    range = gScale * calculatedIncreaseRate;

    if (range > gSttngs().rangeMax) {
      range = gSttngs().rangeMax;
    }

    // range =
    //   gScale *
    //   (gNumberOfFlwItemsNextStatus +
    //     gNumberOfFlwItemsNextStatus * increaseRate);
  }

  return range;
};

//--------------------------------------------------
// refineNewPosition()
//--------------------------------------------------
const refineNewPosition = (
  flwItem /*: FlwItem */,
  nextFlwStepsIndex /*: number */,
  flwItemPosition /*: ThrMeshPosition */,
  gStartPosition /*: ThrMeshPosition */,
  gNumberOfFlwSteps /*: number */,
  range /*: number */,
) /*: ThrMeshPosition */ => {
  const position = { ...flwItemPosition };

  // i.e. Don't do anything if the flwItem is moving into "done"
  if (nextFlwStepsIndex < gNumberOfFlwSteps) {
    position.x =
      gStartPosition.x +
      (Math.round(rndmPosOrNeg() * rndmBetween(0, range) * 100) / 100) *
        rndmPosOrNeg();
    position.y =
      gStartPosition.y +
      (Math.round(rndmBetween(0, range) * 100) / 100) * rndmPosOrNeg();
  }
  return position;
};

export default move;
