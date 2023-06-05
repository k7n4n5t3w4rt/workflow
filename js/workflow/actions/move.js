// @flow
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import randomPositiveOrNegative from "./randomPositiveOrNegative.js";
import anime from "../../../web_modules/animejs.js";
import gSettings from "./gSettings.js";
import gState from "./gState.js";
import randomNumberBetween from "./randomNumberBetween.js";

const move = (workflowItem /*: Object */) /*: void */ => {
  const newPosition = {};
  newPosition.x = workflowItem.position.x;
  newPosition.y = workflowItem.position.y;
  newPosition.z = workflowItem.position.z - gSettings().step;
  const newColor = {};
  newColor.r = 0;
  newColor.g = 0;
  newColor.b = 0;

  const numberOfWorkflowItems = gState().objects.workflowItems.length;
  const nextWorkflowStepsIndex = workflowItem.workflowStepsIndex + 1;

  if (nextWorkflowStepsIndex < gSettings().workflowSteps.length) {
    console.log(
      `Total workflowItems in ${
        gSettings().workflowSteps[nextWorkflowStepsIndex.toString()].name
      }:`,
      gState().objects.workflowStepTotals[nextWorkflowStepsIndex],
    );
    const distributionFix /*: number */ =
      (Math.round(
        (gState().objects.workflowStepTotals[nextWorkflowStepsIndex] /
          numberOfWorkflowItems) *
          100,
      ) /
        100) *
      2.5;
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
          (randomNumberBetween(0, gState().objects.startPosition.y * 100) /
            100) *
          distributionFix *
          100,
      ) / 100;
    console.log("newPosition.x AFTER the fix...", newPosition.x);
    console.log("newPosition.y BEFORE the fix...", newPosition.y);
    newPosition.y =
      Math.round(
        gState().objects.startPosition.y +
          randomPositiveOrNegative() *
            (randomNumberBetween(0, gState().objects.startPosition.y * 100) /
              100) *
            distributionFix *
            100,
      ) / 100;
    console.log("newPosition.y AFTER the fix...", newPosition.y);
  }

  if (
    // If the workflowItem is currently in a Done state, we
    // want to exit gracefully
    gSettings().workflowSteps[workflowItem.workflowStepsIndex].status === "done"
  ) {
    return;
  }

  // if (
  //   // If the workflowItem is currently in the backlog we want to
  //   // start from the official starting line
  //   gSettings().workflowSteps[workflowItem.workflowStepsIndex].status ===
  //   "backlog"
  // ) {
  //   newPosition.z = gState().objects.startPosition.z - gSettings().step;
  // }

  if (
    // If the workflowItem is moving into a touch status
    // make it green and move it one step forward
    gSettings().workflowSteps[nextWorkflowStepsIndex].status === "touch"
  ) {
    newColor.r = 255;
    newColor.g = 255;
    newColor.b = 255;
  } else if (
    // If the workflowItem is moving into a done status
    gSettings().workflowSteps[nextWorkflowStepsIndex].status === "done"
  ) {
    newColor.r = 255;
    newColor.g = 255;
    newColor.b = 255;
    newPosition.x = gState().objects.startPosition.x;
    newPosition.y = gState().objects.startPosition.y;
    newPosition.z =
      gState().objects.startPosition.z -
      gSettings().step * gSettings().workflowSteps.length;
  }
  workflowItem.material.color = newColor;
  // anime({
  //   targets: [workflowItem.material.color],
  //   r: newColor.r,
  //   g: newColor.g,
  //   b: newColor.b,
  //   duration: 1000 / gSettings().speed,
  //   delay: 0,
  //   easing: "linear",
  // });
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
        // If the workflowItem is moving into a done status
        gSettings().workflowSteps[nextWorkflowStepsIndex].status === "done"
      ) {
        workflowItem.visible = false;
      }
      workflowItem.workflowStepsIndex++;
    },
  });
};

const findWorkflowItemsWithTheSameStep =
  (workflowStepsIndex /*: number */) /*: function */ =>
  (
    accumulator /*: number */,
    currentWorkflowItem /*: WorkflowItem */,
  ) /*: number */ => {
    if (currentWorkflowItem.workflowStepsIndex === workflowStepsIndex) {
      accumulator++;
    }
    return accumulator;
  };

export default move;
