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
  const orgnFlwStepsIndex = flwItem.flwStepsIndex;
  let touchStatusFound = false;
  const dstFlwStepsIndex = gSttngs().flwSteps.reduce(
    (
      acc /*: number */,
      flwStep /*: FlwStep */,
      i /*: number */,
    ) /*: number */ => {
      if (
        i >= acc &&
        i < gSttngs().flwSteps.length - 1 &&
        gState().flwStepTotals[i.toString()] !== undefined &&
        gState().flwStepTotals[i.toString()] < gSttngs().flwSteps[i].limit &&
        touchStatusFound === false
      ) {
        if (gSttngs().flwSteps[i].status === "touch") {
          touchStatusFound = true;
        }
        return i;
      } else {
        return acc;
      }
    },
    orgnFlwStepsIndex + 1,
  );

  const gThisStatus = gSttngs().flwSteps[orgnFlwStepsIndex].status;

  if (gThisStatus === "done") {
    return;
  }

  const gNextStatus = gSttngs().flwSteps[dstFlwStepsIndex].status;
  const gNextLimit = gSttngs().flwSteps[dstFlwStepsIndex].limit;
  const gNextTotal = gState().flwStepTotals[dstFlwStepsIndex.toString()];

  // const newPosition = { ...flwItem.position };
  const newPosition = refineNewPosition(
    flwItem,
    dstFlwStepsIndex,
    flwItem.position,
    gState().startPosition,
    gSttngs().flwSteps.length,
    range(gSttngs().scale, gNextTotal),
  );
  newPosition.z -= gSttngs().step;

  let newColor = 0; // Black for "wait" status

  if (gNextLimit > 0 && gNextTotal >= gNextLimit) {
    // console.log(
    //   `Leaving it in “${gSttngs().flwSteps[orgnFlwStepsIndex].name}”`,
    // );
    // Winding back the clock
    updateFlwStepTotal(dstFlwStepsIndex, orgnFlwStepsIndex);
    return;
  }

  // Else... continue

  // console.log(
  // `Moving from “${gSttngs().flwSteps[orgnFlwStepsIndex].name}” to “${
  //   gSttngs().flwSteps[dstFlwStepsIndex].name
  // }”`,
  // );

  if (gNextStatus === "touch") {
    newColor = 255;
  } else if (gNextStatus === "done") {
    newColor = 255;
    newPosition.x = gState().endPosition.x;
    newPosition.y = gState().endPosition.y;
    newPosition.z = gState().endPosition.z + gState().vSphere.dRadius;
  }

  flwItem.material.color = { r: newColor, g: newColor, b: newColor };

  updateFlwStepTotal(orgnFlwStepsIndex, dstFlwStepsIndex);

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
      } else {
        flwItem.flwStepsIndex++;
        flwItem.effortRemaining = flwItem.effortTotal;
        // Try to move the flwItem again, but only if the flwItem is in a wait status
        if (gSttngs().flwSteps[flwItem.flwStepsIndex].status === "wait") {
          move(flwItem);
        }
      }
    },
  });
};

//--------------------------------------------------
// updateFlwStepTotal()
//--------------------------------------------------
const updateFlwStepTotal = (
  originFlwStepsIndex /*: number */,
  destinationFlwStepsIndex /*: number */,
) /*: void */ => {
  // Decrement the previous FlwStepTotal
  if (gState().flwStepTotals[originFlwStepsIndex.toString()] > 0) {
    gState().flwStepTotals[originFlwStepsIndex.toString()]--;
  }
  // Increment the current FlwStepTotal
  gState().flwStepTotals[destinationFlwStepsIndex.toString()]++;
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
    range = gScale * gNumberOfFlwItemsNextStatus;
  }

  // If there are more than 30 flwItems in the next status, then
  // limit the range to 30
  if (gNumberOfFlwItemsNextStatus >= 30) {
    range = (gScale * 30) / 2;
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
