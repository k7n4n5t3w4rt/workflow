// @flow
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import rndmPosOrNeg from "./rndmPosOrNeg.js";
import anime from "../../../web_modules/animejs.js";
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
import rndmBetween from "./rndmBetweenWhatever.js";

const move = (flwItem /*: Object */) /*: void */ => {
  const gThisStatus = gSttngs().flwSteps[flwItem.flwStepsIndex].status;

  if (gThisStatus === "done") {
    return;
  }

  const nextFlwStepsIndex = flwItem.flwStepsIndex + 1;
  const gNextStatus = gSttngs().flwSteps[nextFlwStepsIndex].status;

  // const newPosition = { ...flwItem.position };
  const newPosition = refineNewPosition(
    flwItem,
    nextFlwStepsIndex,
    flwItem.position,
    gState().startPosition,
    gSttngs().flwSteps.length,
    gSttngs().scale *
      10 *
      calculateDistributionFix(
        gState().flwStepTotals[nextFlwStepsIndex.toString()],
        gState().flwItems.length,
      ),
  );
  newPosition.z -= gSttngs().step;

  let newColor = 0; // Black for "wait" status

  if (gNextStatus === "touch") {
    newColor = 255;
  } else if (gNextStatus === "done") {
    newColor = 255;
    newPosition.x = gState().endPosition.x;
    newPosition.y = gState().endPosition.y;
    newPosition.z = gState().endPosition.z;
  }

  flwItem.material.color = { r: newColor, g: newColor, b: newColor };

  anime({
    targets: [flwItem.position],
    x: newPosition.x,
    y: newPosition.y,
    z: newPosition.z,
    duration: 1000 / gSttngs().speed,
    delay: 0,
    easing: "easeInOutCirc",
    complete: (anim) /*: void */ => {
      if (
        // If the flwItem has moved into a done status
        gNextStatus === "done"
      ) {
        flwItem.visible = false;
      }
      flwItem.flwStepsIndex++;
    },
  });
};

//--------------------------------------------------
// refineNewPosition()
//--------------------------------------------------
const refineNewPosition = (
  flwItem /*: FlwItem */,
  nextFlwStepsIndex /*: number */,
  flwItemPosition /*: CubePosition */,
  gStartPosition /*: CubePosition */,
  gNumberOfFlwSteps /*: number */,
  range /*: number */,
) /*: CubePosition */ => {
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

const calculateDistributionFix = (
  gNumberOfFlwItemsNextStatus /*: number */,
  gNumberOfFlwItems /*: number */,
) /*: number */ => {
  // It will be 0 if there are no flwItems in the next step
  // so we'll just set it to 1 to avoid a divide by zero error
  let distributionFix = 1;

  if (gNumberOfFlwItemsNextStatus === 0) {
    return distributionFix;
  }

  distributionFix =
    Math.round((gNumberOfFlwItemsNextStatus / gNumberOfFlwItems) * 100) / 100;

  return distributionFix;
};

export default move;
