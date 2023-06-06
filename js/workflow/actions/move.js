// @flow
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import rndmPosOrNeg from "./rndmPosOrNeg.js";
import anime from "../../../web_modules/animejs.js";
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
import rndmBetween from "./rndmBetweenWhatever.js";

const move = (wrkflwItem /*: Object */) /*: void */ => {
  const gThisStatus = gSttngs().wrkflwSteps[wrkflwItem.wrkflwStepsIndex].status;

  if (gThisStatus === "done") {
    return;
  }

  const nextWrkflwStepsIndex = wrkflwItem.wrkflwStepsIndex + 1;
  const gNextStatus = gSttngs().wrkflwSteps[nextWrkflwStepsIndex].status;

  // const newPosition = { ...wrkflwItem.position };
  const newPosition = refineNewPosition(
    wrkflwItem,
    nextWrkflwStepsIndex,
    wrkflwItem.position,
    gState().startPosition,
    gSttngs().wrkflwSteps.length,
    gSttngs().scale *
      10 *
      calculateDistributionFix(
        gState().wrkflwStepTotals[nextWrkflwStepsIndex.toString()],
        gState().wrkflwItems.length,
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

  wrkflwItem.material.color = { r: newColor, g: newColor, b: newColor };

  anime({
    targets: [wrkflwItem.position],
    x: newPosition.x,
    y: newPosition.y,
    z: newPosition.z,
    duration: 1000 / gSttngs().speed,
    delay: 0,
    easing: "easeInOutCirc",
    complete: (anim) /*: void */ => {
      if (
        // If the wrkflwItem has moved into a done status
        gNextStatus === "done"
      ) {
        wrkflwItem.visible = false;
      }
      wrkflwItem.wrkflwStepsIndex++;
    },
  });
};

//--------------------------------------------------
// refineNewPosition()
//--------------------------------------------------
const refineNewPosition = (
  wrkflwItem /*: WrkflwItem */,
  nextWrkflwStepsIndex /*: number */,
  wrkflwItemPosition /*: CubePosition */,
  gStartPosition /*: CubePosition */,
  gNumberOfWrkflwSteps /*: number */,
  range /*: number */,
) /*: CubePosition */ => {
  const position = { ...wrkflwItemPosition };

  // i.e. Don't do anything if the wrkflwItem is moving into "done"
  if (nextWrkflwStepsIndex < gNumberOfWrkflwSteps) {
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
  gNumberOfWrkflwItemsNextStatus /*: number */,
  gNumberOfWrkflwItems /*: number */,
) /*: number */ => {
  // It will be 0 if there are no wrkflwItems in the next step
  // so we'll just set it to 1 to avoid a divide by zero error
  let distributionFix = 1;

  if (gNumberOfWrkflwItemsNextStatus === 0) {
    return distributionFix;
  }

  distributionFix =
    Math.round((gNumberOfWrkflwItemsNextStatus / gNumberOfWrkflwItems) * 100) /
    100;

  return distributionFix;
};

export default move;
