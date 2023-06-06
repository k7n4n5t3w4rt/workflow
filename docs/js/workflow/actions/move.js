// @flow
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import randomPositiveOrNegative from "./randomPositiveOrNegative.js";
import anime from "../../../web_modules/animejs.js";
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
import randomNumberBetween from "./randomNumberBetweenWhatever.js";

const move = (workflowItem /*: Object */) /*: void */ => {
  const gThisStatus =
    gSttngs().workflowSteps[workflowItem.workflowStepsIndex].status;

  if (gThisStatus === "done") {
    return;
  }

  const nextWorkflowStepsIndex = workflowItem.workflowStepsIndex + 1;
  const gNextStatus = gSttngs().workflowSteps[nextWorkflowStepsIndex].status;

  // const newPosition = { ...workflowItem.position };
  const newPosition = refineNewPosition(
    workflowItem,
    nextWorkflowStepsIndex,
    workflowItem.position,
    gState().objects.startPosition,
    gSttngs().workflowSteps.length,
    gSttngs().scale *
      10 *
      calculateDistributionFix(
        gState().objects.workflowStepTotals[nextWorkflowStepsIndex.toString()],
        gState().objects.workflowItems.length,
      ),
  );
  newPosition.z -= gSttngs().step;

  let newColor = 0; // Black for "wait" status

  if (gNextStatus === "touch") {
    newColor = 255;
  } else if (gNextStatus === "done") {
    newColor = 255;
    newPosition.x = gState().objects.endPosition.x;
    newPosition.y = gState().objects.endPosition.y;
    newPosition.z = gState().objects.endPosition.z;
  }

  workflowItem.material.color = { r: newColor, g: newColor, b: newColor };

  anime({
    targets: [workflowItem.position],
    x: newPosition.x,
    y: newPosition.y,
    z: newPosition.z,
    duration: 1000 / gSttngs().speed,
    delay: 0,
    easing: "easeInOutCirc",
    complete: (anim) /*: void */ => {
      if (
        // If the workflowItem has moved into a done status
        gNextStatus === "done"
      ) {
        workflowItem.visible = false;
      }
      workflowItem.workflowStepsIndex++;
    },
  });
};

//--------------------------------------------------
// refineNewPosition()
//--------------------------------------------------
const refineNewPosition = (
  workflowItem /*: WorkflowItem */,
  nextWorkflowStepsIndex /*: number */,
  workflowItemPosition /*: CubePosition */,
  gStartPosition /*: CubePosition */,
  gNumberOfWorkflowSteps /*: number */,
  range /*: number */,
) /*: CubePosition */ => {
  const position = { ...workflowItemPosition };

  // i.e. Don't do anything if the workflowItem is moving into "done"
  if (nextWorkflowStepsIndex < gNumberOfWorkflowSteps) {
    position.x =
      gStartPosition.x +
      (Math.round(
        randomPositiveOrNegative() * randomNumberBetween(0, range) * 100,
      ) /
        100) *
        randomPositiveOrNegative();
    position.y =
      gStartPosition.y +
      (Math.round(randomNumberBetween(0, range) * 100) / 100) *
        randomPositiveOrNegative();
  }
  return position;
};

const calculateDistributionFix = (
  gNumberOfWorkflowItemsNextStatus /*: number */,
  gNumberOfWorkflowItems /*: number */,
) /*: number */ => {
  // It will be 0 if there are no workflowItems in the next step
  // so we'll just set it to 1 to avoid a divide by zero error
  let distributionFix = 1;

  if (gNumberOfWorkflowItemsNextStatus === 0) {
    return distributionFix;
  }

  distributionFix =
    Math.round(
      (gNumberOfWorkflowItemsNextStatus / gNumberOfWorkflowItems) * 100,
    ) / 100;

  return distributionFix;
};

export default move;
