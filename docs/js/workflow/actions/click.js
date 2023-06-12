// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import anime from "../../../web_modules/animejs.js";
import newFlwItem from "./newFlwItem.js";
import move from "./move.js";
import isDone from "../calculations/isDone.js";
import flwItmTracker from "./flwItmTracker.js";
import filterOutDoneItems from "./filterOutDoneItems.js";
import removeFlowItem from "./removeFlowItem.js";

const click = () /*: void */ => {
  gState().clicks++;
  animateClickCube();
};

//------------------------------------------------------------------
// animateClickCube()
//------------------------------------------------------------------
const animateClickCube = () /*: void */ => {
  // Rotate the clckCube
  anime({
    targets: [gState().clckCbGroup.clckCube.rotation],
    y: gState().clckCbGroup.clckCube.rotation.y + Math.PI / 2,
    duration: 1000,
    easing: "easeInOutSine",
    complete: onClickComplete,
  });
};

//------------------------------------------------------------------
// onClickComplete()
//------------------------------------------------------------------
const onClickComplete = () /*: void */ => {
  calculateWip();
  filterOutDoneItems();
  updateWIPQueue();
  resizeVSphere();
  updateAgeAndEffortForAllItems();
  newFlwItem();
  pullFlwItems();
  // Start the click cycle over again
  click();
};

//------------------------------------------------------------------
// calculateWip()
//------------------------------------------------------------------
const calculateWip = () /*: void */ => {
  let wip = 0;
  // For each flwStep in the flwMap...
  getFlwMpSteps().forEach((flwMpStpItems /*: FlwItem[] */) /*: Object */ => {
    // For each flwItem in this step...
    wip += flwMpStpItems.filter((flwItem /*: FlwItem */) /*: boolean */ => {
      if (gSttngs().flwSteps[flwItem.dFlwStpsIndex].status === "touch") {
        return true;
      } else {
        return false;
      }
    }).length;
  });
  gState().WIP = wip;
};

//------------------------------------------------------------------
// updateAgeAndEffortForAllItems()
//------------------------------------------------------------------
const updateAgeAndEffortForAllItems = () /*: void */ => {
  // For each flwStep in the flwMap...
  getFlwMpSteps().forEach((flwMpStpItems /*: FlwItem[] */) /*: Object */ => {
    // For each flwItem in this step...
    flwMpStpItems.forEach(updateFlwItemProperties);
  });
};

//------------------------------------------------------------------
// updateFlwItemProperties()
//------------------------------------------------------------------
const updateFlwItemProperties = (
  flwItem /*: FlwItem */,
  index /*:number */,
) /*: void */ => {
  // If this flwItem is in the backlog, don't update it
  if (gSttngs().flwSteps[flwItem.dFlwStpsIndex].status === "backlog") {
    return;
  }
  // Otherwise, check if it has died of old age...
  if (++flwItem.dAge >= gSttngs().death) {
    // ...and if so, remove it
    removeFlowItem(flwItem, index);
    return;
  } else {
    // Otherwise, update its age and effort
    makeItOneClickOlder(flwItem);
  }
};
//------------------------------------------------------------------
// makeItOneClickOlder()
//------------------------------------------------------------------
const makeItOneClickOlder = (flwItem /*: FlwItem */) /*: void */ => {
  // If the flwItem is not dead, make it more transparent
  if (flwItem.dAge <= gSttngs().death && flwItem.dAge % 1 === 0) {
    flwItem.material.opacity = 1 - flwItem.dAge / gSttngs().death;
    flwItem.material.needsUpdate = true;
  }
  // Update the effort remaining, making sure it doesn't go below 0
  updateEffortRemainingCurrentStep(flwItem);
  if (flwItem.dEffrtRmnngCurrentStep < 0) {
    flwItem.dEffrtRmnngCurrentStep = 0;
  }
};

//------------------------------------------------------------------
// updateEffortRemainingCurrentStep()
//------------------------------------------------------------------
const updateEffortRemainingCurrentStep = (
  flwItem /*: FlwItem */,
) /*: void */ => {
  const stepProcessTime = gSttngs().processTime / gSttngs().touchSteps;
  const adjustedStepCycleTime =
    stepProcessTime * Math.exp(gState().drag * gState().WIP);
  const numberOfDevs = gSttngs().tmSize * gSttngs().tmsNumber;
  const numberOfDevsPerStep = numberOfDevs / gSttngs().touchSteps;
  const numberOfFlowItemsThisStep =
    gState().flwMap[flwItem.dFlwStpsIndex.toString()].length;
  const devPowerThisStep = numberOfDevsPerStep / numberOfFlowItemsThisStep;
  const effortExpended = adjustedStepCycleTime / devPowerThisStep;
  flwItem.dEffrtRmnngCurrentStep -= effortExpended;
};

//------------------------------------------------------------------
// pullFlwItems()
//------------------------------------------------------------------
function pullFlwItems() {
  // Get the flwMpSteps  as an array (the flwMap is an "hash map" object)
  const flwMpSteps = getFlwMpSteps();
  // reduceRight() starts at the end of the array and works backwards.
  // For each step, check the limit and, if there is space, pull from
  // the previous step
  flwMpSteps.reduceRight(checkStepLimitAndPull, null);
}

//------------------------------------------------------------------
// getFlwMpSteps()
//------------------------------------------------------------------
const getFlwMpSteps = () /*: FlwMpItems[] */ => {
  // Get the keys for all the steps in the flwMap hash map
  const flwMpStpKeys = Object.keys(gState().flwMap);
  // Turn the array of keys into an array of step objects, each of which
  // will be a hash map of flwItems. The key for each flwItem is the
  // flwItem's name property, a dupicate of the uuid property.
  const flwMpSteps = flwMpStpKeys.map(
    (flwMpStpKey /*: string */) /*: FlwMpItems */ => {
      return gState().flwMap[flwMpStpKey];
    },
  );
  return flwMpSteps;
};

//------------------------------------------------------------------
// checkStepLimitAndPull()
//------------------------------------------------------------------
const checkStepLimitAndPull = (
  // Note: We need the accumulator or the Done step is skipped.
  _ /*: null | void */, // The accumulator is not used but reduceRight() requires it
  flwMpStpItems /*: FlwMpItems */,
  flwMpStpKeyNumber /*: number */,
) /*: void */ => {
  // Get the limit of the current step
  const flwStpLimit = gSttngs().flwSteps[flwMpStpKeyNumber].limit;
  // Check that the number of flwItems in this step is less than
  // the limit. Note that a limit of 0 means no limit
  if (flwMpStpItems.length < flwStpLimit || flwStpLimit === 0) {
    let availableLimit /*: "no limit" | 0 | number */ = 0;
    // If the limit for this step is 0, then there is no limit
    // to the availableLimit
    if (flwStpLimit === 0) {
      availableLimit = "no limit";
    } else {
      // Because of the check above, this will be between 1 and
      // the flow step limit
      availableLimit = flwStpLimit - flwMpStpItems.length;
    }
    pullFromPreviousStep(flwMpStpKeyNumber - 1, availableLimit);
  }
};

//------------------------------------------------------------------
// pullFromPreviousStep()
//------------------------------------------------------------------
const pullFromPreviousStep = (
  flwMpStpKeyNumber /*: number */,
  availableLimit /*: "no limit" | number */,
) /*: void */ => {
  // We could be at the 'beginning' of the flow map
  if (flwMpStpKeyNumber < 0) {
    return;
  }
  // Get the flwMpStep as a hash map of flwItem keys
  const flwMpStpItems = gState().flwMap[flwMpStpKeyNumber.toString()];
  // If there are no flwItems in this step, then there is nothing to pull
  if (flwMpStpItems.length > 0) {
    // For each flwItem in this step...
    flwMpStpItems.reduce(pullFlowItem, availableLimit);
  }
};

//------------------------------------------------------------------
// pullFlowItem()
//------------------------------------------------------------------
const pullFlowItem = (
  availableLimit /*: "no limit" | number */,
  flwItem /*: FlwItem */,
  index /*: number */,
) /*: "no limit" | number */ => {
  // Check if the fwItem has died of old age
  if (flwItem.dAge >= gSttngs().death) {
    return availableLimit;
  }
  // This will happen when we have used up the availableLimit
  // and we've pulled the last flwItem we can pull
  if (availableLimit === 0) {
    return availableLimit;
  } else if (availableLimit !== "no limit") {
    // If we have a limit, then decrement it
    availableLimit--;
  }

  if (
    // If the flwItem.dFlwStpsIndex is 0, then we are at the backlog, in
    // which case the dEffrtRmnngCurrentStep is not relevant
    flwItem.dFlwStpsIndex === 0 ||
    // In all other cases, we only want to move the flwItem if it is
    // not moving and it has no effort remaining
    (flwItem.dEffrtRmnngCurrentStep <= 0 && !flwItem.dMoving)
  ) {
    move(flwItem);
    updateFlowMap(flwItem, index);
  }
  return availableLimit;
};

//------------------------------------------------------------------
// updateFlowMap()
//------------------------------------------------------------------
const updateFlowMap = (
  flwItem /*: FlwItem */,
  index /*: number */,
) /*: void */ => {
  // Remove the flwItem from the current step in the flwMap
  // NOTE: The flwItem.dFlwStpsIndex was updated in the move() function
  // so we need to use -1 to get the flwMap step we want
  const deletedFlwItem = gState().flwMap[
    (flwItem.dFlwStpsIndex - 1).toString()
  ].splice(index, 1);
  // Add the flwItem to the correct step in the flwMap
  gState().flwMap[flwItem.dFlwStpsIndex.toString()].push(flwItem);
};

//------------------------------------------------------------------
// updateWIPQueue()
//------------------------------------------------------------------
const updateWIPQueue = () /*: void */ => {
  if (gState().wipQueue.length() >= gSttngs().timeBox) {
    gState().wipQueue.dequeue();
  }
  // PLACEHOLER: This is where we would calculate the WIP
  gState().wipQueue.enqueue(gState().WIP);
};

//------------------------------------------------------------------
// resizeVSphere()
//------------------------------------------------------------------
const resizeVSphere = () /*: void */ => {
  if (gState().vQueue.total === 0) {
    return;
  }
  animateScale();
  animatePosition();
};

const animatePosition = () /*: void */ => {
  gState().vSphere.dPosition.z =
    gState().endPosition.z + gState().vSphere.dRadius * 2;

  anime({
    targets: [gState().vSphere.position],
    z: gState().vSphere.dPosition.z,
    duration: 300,
    delay: 0,
    easing: "linear",
    complete: (anim) /*: void */ => {
      gState().vSphere.dMoving = false;
      gState().vSphere.visible = true;
    },
  });
};

const animateScale = () /*: void */ => {
  // Create an object with a scale property that can be animated.
  let scaleObject = { scale: gState().vSphere.dRadius };
  const newRadius = findRadius(gState().vQueue.total());
  gState().vSphere.dRadius = newRadius;

  if (!gState().vSphere.dMoving) {
    gState().vSphere.dMoving = true;

    // Create an animation that transitions the scale from 1.0 to 2.0 over 2 seconds.
    anime({
      targets: [scaleObject],
      scale: newRadius,
      duration: 300,
      easing: "linear",
      // Update the sphere's scale on each frame.
      update: function () {
        gState().vSphere.scale.set(
          scaleObject.scale,
          scaleObject.scale,
          scaleObject.scale,
        );
      },
    });
  }
};

const findRadius = (volume /*: number */) /*: number */ => {
  if (volume <= 0) {
    return 0;
  }
  const pi = Math.PI;
  let radius = Math.cbrt((3 * volume) / (4 * pi));
  return radius;
};

export default click;
