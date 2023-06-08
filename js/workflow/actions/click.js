// @flow
// --------------------------------------------------
// THREE.js
// --------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
// --------------------------------------------------
// GLOBALS
// --------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import anime from "../../../web_modules/animejs.js";
import newFlwItem from "./newFlwItem.js";
import move from "./move.js";
import calculateEffortRemaining from "../calculations/calculateEffortRemaining.js";
import calculatedEffortPerWorkItem from "../calculations/calculatedEffortPerWorkItem.js";
import isDone from "../calculations/isDone.js";

const click = () /*: void */ => {
  gState().clicks++;
  // Rotate the clickCube
  anime({
    targets: [gState().clickCubeGroup.clickCube.rotation],
    y: gState().clickCubeGroup.clickCube.rotation.y + Math.PI / 2,
    duration: 1000,
    easing: "easeInOutSine",
    complete: () /*: void */ => {
      if (
        gState().clicks % gSttngs().valueUpdateInterval === 0 ||
        gState().clicks < gSttngs().valueUpdateInterval
      ) {
        filterOutDoneItems();
        resizeVSphere();
        // Update the TouchTotal
        updateTouchTotal();
        // A fix because things get out of whack
        // It would be good to know why things get out of whack
        updateTotalsForEveryFlwStep();
      }
      newFlwItem();
      moveAllFlwItems();
      click();
    },
  });
};

//--------------------------------------------------
// updateTouchTotal()
//--------------------------------------------------
const updateTouchTotal = () /*: void */ => {
  gState().flwStepTotals.touchTotal = 0;
  gSttngs().flwSteps.forEach((flwStep /*: FlwStep */) /*: void */ => {
    if (flwStep.status === "touch") {
      gState().flwStepTotals.touchTotal += flwStep.limit;
    }
  });
  // If there is no WIP limit, then the touchTotal is the total number of items
  if (gState().flwStepTotals.touchTotal === 0) {
    gState().flwStepTotals.touchTotal = gState().flwItems.length;
  }
};
//--------------------------------------------------
// updateTotalsForEveryFlwStep()
//--------------------------------------------------
const updateTotalsForEveryFlwStep = () /*: void */ => {
  // Start with a clean slate
  gState().flwStepTotals = {
    touchTotal: gState().flwStepTotals.touchTotal,
    doneTotal: gState().flwStepTotals.doneTotal,
  };
  // Make a property for each flwStep
  gSttngs().flwSteps.forEach(
    (flwStep /*: FlwStep */, index /*: number */) /*: void */ => {
      gState().flwStepTotals[index.toString()] = 0;
    },
  );
  // For each flwItem, add to the total for its flwStep
  gState().flwItems.forEach((flwItem /*: FlwItem */) /*: void */ => {
    gState().flwStepTotals[flwItem.dFlwStepsIndex.toString()]++;
  });
};

// //--------------------------------------------------
// // updateValueQueue()
// //--------------------------------------------------
// const updateValueQueue = (flwItemValue /*: number */) /*: void */ => {
//   if (gState().vQueue.length() >= gSttngs().valueUpdateInterval) {
//     gState().vQueue.dequeue();
//   }
//   gState().vQueue.enqueue(flwItemValue);
// };

//--------------------------------------------------
// resizeVSphere()
//--------------------------------------------------
function resizeVSphere() {
  if (gState().vSphere.dRllngTtlVolume === 0) {
    return;
  }
  const newRadius = findRadius(gState().vSphere.dRllngTtlVolume);
  gState().vSphere.dRllngTtlVolume = 0;
  gState().vSphere.dRadius = newRadius;
  // Doesn't work :(
  // gState().vSphere.scale.set(newRadius, newRadius, newRadius);
  // Nor does this :(
  // gState().vSphere.scale.x = newRadius;
  // gState().vSphere.scale.y = newRadius;
  // gState().vSphere.scale.z = newRadius;
  // This does though :)
  gState().vSphere.geometry.dispose();
  gState().vSphere.geometry = new THREE.SphereGeometry(newRadius, 32, 32);
  gState().vSphere.dPosition.z = gState().endPosition.z + newRadius;
  gState().vSphere.position.z = gState().endPosition.z + newRadius;
}

const findRadius = (volume /*: number */) /*: number */ => {
  if (volume <= 0) {
    return 0;
  }
  const pi = Math.PI;
  let radius = Math.cbrt((3 * volume) / (4 * pi));
  // console.log("// --------------------------------------------------");
  // console.log("volume", volume);
  // console.log("radius", radius);
  // console.log("// --------------------------------------------------");
  return radius;
};

//--------------------------------------------------
// filterOutDoneItems()
//--------------------------------------------------
function filterOutDoneItems() /*: void */ {
  gState().vSphere.dRllngTtlVolume = 0;
  gState().flwItems = gState().flwItems.filter(removeDoneFlwItems);
}

const removeDoneFlwItems = (flwItem /*: FlwItem */) /*: boolean */ => {
  // Note: No need to delete the flwItem object becase
  // it will be filtered out of the array with the return false
  if (isDone(flwItem.dFlwStepsIndex, gSttngs().flwSteps)) {
    // Filter out any flwItems that are Done
    gState().flwStepTotals.doneTotal++;
    // console.log("flwItem.dVolume", flwItem.dVolume);
    gState().vSphere.dRllngTtlVolume += flwItem.dVolume;
    gState().scnData.scene.remove(
      gState().scnData.scene.getObjectByName(flwItem.name),
    );
    // Assuming the dFlwStepsIndex is correct...
    gState().flwStepTotals[flwItem.dFlwStepsIndex.toString()]--;
    return false;
  } else if (flwItem.age >= gSttngs().death) {
    // Filter out any flwItems that are older than a year
    return false;
  }
  return true;
};

//--------------------------------------------------
// moveFlwItemAndUpdateProperties()
//--------------------------------------------------
const moveFlwItemAndUpdateProperties = (
  flwItem /*: FlwItem */,
  index /*: number */,
) => {
  // First, make it a day older
  updateAgeOrRemoveFromScene(flwItem, index);

  // Check if all the effort has been expended...
  // ...or if the flwItem is in a "wait" or "backlog" state
  if (
    flwItem.dEffortRemaining === 0 ||
    gSttngs().flwSteps[flwItem.dFlwStepsIndex].status === "wait" ||
    gSttngs().flwSteps[flwItem.dFlwStepsIndex].status === "backlog"
  ) {
    // Move the flwItem
    move(flwItem);
    // Reset the effort counter
    flwItem.dEffortRemaining = flwItem.dEffortTotal;
  } else {
    // ...decrement the effort counter
    flwItem.dEffortRemaining = calculateEffortRemaining(
      flwItem.dEffortRemaining,
      calculatedEffortPerWorkItem(
        gSttngs().teamsNumber,
        gSttngs().teamSize,
        gState().flwStepTotals.touchTotal,
      ),
    );
  }
  return true;
};

//--------------------------------------------------
// updateAgeOrRemoveFromScene()
//--------------------------------------------------
function updateAgeOrRemoveFromScene(
  flwItem /*: FlwItem */,
  index /*: number */,
) {
  if (flwItem.age < gSttngs().death) {
    flwItem.age++;
    if (flwItem.age <= gSttngs().death && flwItem.age % 10 === 0) {
      flwItem.material.opacity = 1 - flwItem.age / gSttngs().death;
      flwItem.material.needsUpdate = true;
    }
  } else {
    // console.log(`WorkFlowItem ${flwItem.name} is too old.`);
    gState().flwStepTotals[flwItem.dFlwStepsIndex.toString()]--;
    gState().scnData.scene.remove(
      gState().scnData.scene.getObjectByName(flwItem.name),
    );
    gState().flwItems.splice(index, 1);
  }
}

//--------------------------------------------------
// moveAllFlwItems()
//--------------------------------------------------
function moveAllFlwItems() {
  gState().flwItems.forEach(moveFlwItemAndUpdateProperties);
}

export default click;
