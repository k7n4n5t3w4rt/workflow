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
import createNewWrkflwItem from "./newFlwItem.js";
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
        updateTotalsForEachWrkflwStep();
      }
      createNewWrkflwItem();
      moveAllWrkflwItems();
      click();
    },
  });
};

//--------------------------------------------------
// updateTotalsForEachWrkflwStep()
//--------------------------------------------------
const updateTotalsForEachWrkflwStep = () /*: void */ => {
  gState().wrkflwStepTotals = {
    touchTotal: 0,
    doneTotal: gState().wrkflwStepTotals.doneTotal,
  };
  gSttngs().wrkflwSteps.forEach(
    (wrkflwStep /*: WrkflwStep */, index /*: number */) /*: void */ => {
      gState().wrkflwStepTotals[index.toString()] = 0;
    },
  );
  gState().wrkflwItems.forEach((wrkflwItem /*: WrkflwItem */) /*: void */ => {
    gState().wrkflwStepTotals[wrkflwItem.wrkflwStepsIndex.toString()]++;
    if (gSttngs().wrkflwSteps[wrkflwItem.wrkflwStepsIndex].status === "touch") {
      gState().wrkflwStepTotals.touchTotal++;
    }
  });
};

//--------------------------------------------------
// updateValueQueue()
//--------------------------------------------------
const updateValueQueue = (wrkflwItemValue /*: number */) /*: void */ => {
  // Collect the value of all the Done wrkflwItems
  if (gState().vQueue.length() > gSttngs().valueUpdateInterval) {
    gState().vQueue.dequeue();
  }
  // const collectedValue = gState().wrkflwItems.reduce(collectValue, 0);
  gState().vQueue.enqueue(wrkflwItemValue);
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
  gState().wrkflwItems = gState().wrkflwItems.filter(removeDoneWrkflwItems);
}

const removeDoneWrkflwItems = (wrkflwItem /*: WrkflwItem */) /*: boolean */ => {
  // Note: No need to delete the wrkflwItem object becase
  // it will be filtered out of the array
  if (isDone(wrkflwItem.wrkflwStepsIndex, gSttngs().wrkflwSteps)) {
    // Filter out any wrkflwItems that are Done
    gState().wrkflwStepTotals.doneTotal++;
    updateValueQueue(wrkflwItem.volume);
    gState().sceneData.scene.remove(
      gState().sceneData.scene.getObjectByName(wrkflwItem.name),
    );
    return false;
  } else if (wrkflwItem.age >= gSttngs().death) {
    // Filter out any wrkflwItems that are older than a year
    return false;
  }
  return true;
};

//--------------------------------------------------
// moveWrkflwItemAndUpdateProperties()
//--------------------------------------------------
const moveWrkflwItemAndUpdateProperties = (wrkflwItem /*: WrkflwItem */) => {
  // First, make it a day older
  updateAgeOrRemoveFromScene(wrkflwItem);

  // Check if all the effort has been expended...
  // ...or if the wrkflwItem is in a "wait" or "backlog" state
  if (
    wrkflwItem.effortRemaining === 0 ||
    gSttngs().wrkflwSteps[wrkflwItem.wrkflwStepsIndex].status === "wait" ||
    gSttngs().wrkflwSteps[wrkflwItem.wrkflwStepsIndex].status === "backlog"
  ) {
    // Move the wrkflwItem
    move(wrkflwItem);
    // Reset the effort counter
    wrkflwItem.effortRemaining = wrkflwItem.effortTotal;
  } else {
    // ...decrement the effort counter
    wrkflwItem.effortRemaining = calculateEffortRemaining(
      wrkflwItem.effortRemaining,
      calculatedEffortPerWorkItem(
        gSttngs().teamsNumber,
        gSttngs().teamSize,
        gState().wrkflwStepTotals.touchTotal,
      ),
    );
  }
  return true;
};

//--------------------------------------------------
// updateAgeOrRemoveFromScene()
//--------------------------------------------------
function updateAgeOrRemoveFromScene(wrkflwItem) {
  if (wrkflwItem.age < gSttngs().death) {
    wrkflwItem.age++;
    if (wrkflwItem.age <= gSttngs().death && wrkflwItem.age % 10 === 0) {
      wrkflwItem.material.opacity = 1 - wrkflwItem.age / gSttngs().death;
      wrkflwItem.material.needsUpdate = true;
    }
  } else {
    console.log(`WorkFlowItem ${wrkflwItem.name} is too old.`);
    gState().sceneData.scene.remove(
      gState().sceneData.scene.getObjectByName(wrkflwItem.name),
    );
  }
}

//--------------------------------------------------
// moveAllWrkflwItems()
//--------------------------------------------------
function moveAllWrkflwItems() {
  gState().wrkflwItems.forEach(moveWrkflwItemAndUpdateProperties);
}

export default click;
