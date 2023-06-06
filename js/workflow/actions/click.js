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
import newSphereRadius from "../calculations/newSphereRadius.js";

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
        updateTotalsForEachFlwStep();
      }
      newFlwItem();
      moveAllFlwItems();
      click();
    },
  });
};

//--------------------------------------------------
// updateTotalsForEachFlwStep()
//--------------------------------------------------
const updateTotalsForEachFlwStep = () /*: void */ => {
  gState().flwStepTotals = {
    touchTotal: 0,
    doneTotal: gState().flwStepTotals.doneTotal,
  };
  gSttngs().flwSteps.forEach(
    (flwStep /*: FlwStep */, index /*: number */) /*: void */ => {
      gState().flwStepTotals[index.toString()] = 0;
    },
  );
  gState().flwItems.forEach((flwItem /*: FlwItem */) /*: void */ => {
    gState().flwStepTotals[flwItem.flwStepsIndex.toString()]++;
    if (gSttngs().flwSteps[flwItem.flwStepsIndex].status === "touch") {
      gState().flwStepTotals.touchTotal++;
    }
  });
};

//--------------------------------------------------
// updateValueQueue()
//--------------------------------------------------
const updateValueQueue = (flwItemValue /*: number */) /*: void */ => {
  // Collect the value of all the Done flwItems
  if (gState().vQueue.length() > gSttngs().valueUpdateInterval) {
    gState().vQueue.dequeue();
  }
  // const collectedValue = gState().flwItems.reduce(collectValue, 0);
  gState().vQueue.enqueue(flwItemValue);
};

//--------------------------------------------------
// resizeVSphere()
//--------------------------------------------------
function resizeVSphere() {
  gState().vSphere.rollingTotal = gState().vQueue.total();
  const newRadius = Math.cbrt(
    gState().vSphere.rollingTotal / ((4 / 3) * Math.PI),
  );
  // Doesn't work :(
  // gState().vSphere.scale.set(newRadius, newRadius, newRadius);
  // Nor does this :(
  // gState().vSphere.scale.x = newRadius;
  // gState().vSphere.scale.y = newRadius;
  // gState().vSphere.scale.z = newRadius;
  // This does though :)
  gState().vSphere.geometry.dispose();
  gState().vSphere.geometry = new THREE.SphereGeometry(newRadius, 32, 32);
}

//--------------------------------------------------
// filterOutDoneItems()
//--------------------------------------------------
function filterOutDoneItems() /*: void */ {
  gState().flwItems = gState().flwItems.filter(removeDoneFlwItems);
}

const removeDoneFlwItems = (flwItem /*: FlwItem */) /*: boolean */ => {
  // Note: No need to delete the flwItem object becase
  // it will be filtered out of the array
  if (isDone(flwItem.flwStepsIndex, gSttngs().flwSteps)) {
    // Filter out any flwItems that are Done
    gState().flwStepTotals.doneTotal++;
    updateValueQueue(flwItem.volume);
    gState().sceneData.scene.remove(
      gState().sceneData.scene.getObjectByName(flwItem.name),
    );
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
const moveFlwItemAndUpdateProperties = (flwItem /*: FlwItem */) => {
  // First, make it a day older
  updateAgeOrRemoveFromScene(flwItem);

  // Check if all the effort has been expended...
  // ...or if the flwItem is in a "wait" or "backlog" state
  if (
    flwItem.effortRemaining === 0 ||
    gSttngs().flwSteps[flwItem.flwStepsIndex].status === "wait" ||
    gSttngs().flwSteps[flwItem.flwStepsIndex].status === "backlog"
  ) {
    // Move the flwItem
    move(flwItem);
    // Reset the effort counter
    flwItem.effortRemaining = flwItem.effortTotal;
  } else {
    // ...decrement the effort counter
    flwItem.effortRemaining = calculateEffortRemaining(
      flwItem.effortRemaining,
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
function updateAgeOrRemoveFromScene(flwItem) {
  if (flwItem.age < gSttngs().death) {
    flwItem.age++;
    if (flwItem.age <= gSttngs().death && flwItem.age % 10 === 0) {
      flwItem.material.opacity = 1 - flwItem.age / gSttngs().death;
      flwItem.material.needsUpdate = true;
    }
  } else {
    console.log(`WorkFlowItem ${flwItem.name} is too old.`);
    gState().sceneData.scene.remove(
      gState().sceneData.scene.getObjectByName(flwItem.name),
    );
  }
}

//--------------------------------------------------
// moveAllFlwItems()
//--------------------------------------------------
function moveAllFlwItems() {
  gState().flwItems.forEach(moveFlwItemAndUpdateProperties);
}

export default click;
