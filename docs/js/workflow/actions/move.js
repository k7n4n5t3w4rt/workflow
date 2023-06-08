// @flow
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
  orgnFlwStepsIndex /*: number */,
  dstFlwStepsIndex /*: number */,
) /*: void */ => {
  const gThisStatus = gSttngs().flwSteps[orgnFlwStepsIndex].status;

  // Do we need this logic with the flwMap?
  if (gThisStatus === "done") {
    return;
  }

  const gNextStatus = gSttngs().flwSteps[dstFlwStepsIndex].status;

  // const newPosition = { ...flwItem.position };
  const newPosition = refineNewPosition(
    flwItem,
    dstFlwStepsIndex,
    flwItem.dPosition,
    gState().strtPosition,
    gSttngs().flwSteps.length,
    range(gSttngs().scale, gSttngs().flwSteps[dstFlwStepsIndex].limit),
  );
  newPosition.z -= gSttngs().step;

  let newColor = 0; // Black for "wait" status

  if (gNextStatus === "touch") {
    newColor = 255;
  } else if (gNextStatus === "done") {
    newColor = 255;
    newPosition.x = gState().endPosition.x;
    newPosition.y = gState().endPosition.y;
    newPosition.z = gState().endPosition.z + gState().vSphere.dRadius;
  }

  flwItem.material.color = { r: newColor, g: newColor, b: newColor };

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
        gNextStatus === "done"
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
    const increaseRate = 1;
    const decreaseRate = 0.95; // Modify this value to change the rate of decrease

    // Does this even make sense? GPT-4 told me to do it.
    let calculatedIncreaseRate =
      gNumberOfFlwItemsNextStatus +
      gNumberOfFlwItemsNextStatus * increaseRate -
      gNumberOfFlwItemsNextStatus * decreaseRate;

    if (calculatedIncreaseRate > 7) {
      calculatedIncreaseRate = 7;
    }

    console.log("calculatedIncreaseRate", calculatedIncreaseRate);

    range = gScale * calculatedIncreaseRate;

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
      gStartPosition.y + Math.round(rndmBetween(0, range) * 100) / 100;
  }
  return position;
};

export default move;
