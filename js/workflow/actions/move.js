// @flow
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import randomPositiveOrNegative from "./randomPositiveOrNegative.js";
import anime from "../../../web_modules/animejs.js";
import gSettings from "./gSettings.js";
import gState from "./gState.js";
import randomNumberBetween from "./randomNumberBetweenWhatever.js";

const move = (workflowItem /*: Object */) /*: void */ => {
  const newPosition = workflowItem.position;
  newPosition.z = workflowItem.position.z - gSettings().step;
  let newColor = 0;

  const nextWorkflowStepsIndex = workflowItem.workflowStepsIndex + 1;
  const nextStatus =
    gSettings().workflowSteps[workflowItem.workflowStepsIndex].status;

  refineNewPosition(workflowItem, nextWorkflowStepsIndex, newPosition);

  if (nextStatus === "done") {
    return;
  }

  if (nextStatus === "touch") {
    newColor = 255;
  } else if (nextStatus === "done") {
    newColor = 255;
    newPosition.x = gState().objects.startPosition.x;
    newPosition.y = gState().objects.startPosition.y;
    newPosition.z =
      gState().objects.startPosition.z -
      gSettings().step * gSettings().workflowSteps.length;
  }

  workflowItem.material.color = { newColor, newColor, newColor };

  anime({
    targets: [workflowItem.position],
    x: newPosition.x,
    y: newPosition.y,
    z: newPosition.z,
    duration: 1000 / gSettings().speed,
    delay: 0,
    easing: "easeInOutCirc",
    complete: (anim) /*: void */ => {
      if (
        // If the workflowItem has moved into a done status
        nextStatus === "done"
      ) {
        workflowItem.visible = false;
      }
      workflowItem.workflowStepsIndex++;
    },
  });
};

const refineNewPosition = (
  workflowItem /*: WorkflowItem */,
  nextWorkflowStepsIndex /*: number */,
  newPosition /*: CubePosition */,
) /*: void */ => {
  const numberOfWorkflowItems = gState().objects.workflowItems.length;
  const range = gSettings().scale;

  if (nextWorkflowStepsIndex < gSettings().workflowSteps.length) {
    console.log(
      `Total workflowItems in ${
        gSettings().workflowSteps[nextWorkflowStepsIndex].name
      }:`,
      gState().objects.workflowStepTotals[nextWorkflowStepsIndex.toString()],
    );

    const distributionFix = calculateDistributionFix(
      nextWorkflowStepsIndex,
      numberOfWorkflowItems,
    );

    console.log(gState().objects.workflowStepTotals);
    console.log(
      `${
        gState().objects.workflowStepTotals[nextWorkflowStepsIndex.toString()]
      } / ${numberOfWorkflowItems} = ${distributionFix}}`,
    );
    console.log("newPosition.x BEFORE the fix...", newPosition.x);
    newPosition.x =
      Math.round(
        randomPositiveOrNegative() *
          randomNumberBetween(0, range * distributionFix) *
          100,
      ) / 100;
    console.log("newPosition.x AFTER the fix...", newPosition.x);
    console.log("newPosition.y BEFORE the fix...", newPosition.y);
    newPosition.y =
      Math.round(
        gState().objects.startPosition.y +
          randomPositiveOrNegative() *
            randomNumberBetween(0, range * distributionFix) *
            100,
      ) / 100;
    console.log("newPosition.y AFTER the fix...", newPosition.y);
  }
};

const calculateDistributionFix = (
  nextWorkflowStepsIndex /*: number */,
  numberOfWorkflowItems /*: number */,
) /*: number */ => {
  // It will be 0 if there are no workflowItems in the next step
  // so we'll just set it to 1 to avoid a divide by zero error
  let distributionFix /*: number */ =
    Math.round(
      (gState().objects.workflowStepTotals[nextWorkflowStepsIndex.toString()] /
        numberOfWorkflowItems) *
        100,
    ) / 100;
  if (distributionFix === 0) {
    distributionFix = 1;
  }
  return distributionFix;
};

export default move;
