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
import flwItmTracker from "./flwItmTracker.js";

const click = () /*: void */ => {
  gState().clicks++;
  animateClickCube();
};

//--------------------------------------------------
// onClickComplete()
//--------------------------------------------------
const onClickComplete = () /*: void */ => {
  filterOutDoneItems();
  resizeVSphere();
  updateAgeAndEffortForAllItems();
  newFlwItem();
  pullFlwItems();
  click();
};

//--------------------------------------------------
// animateClickCube()
//--------------------------------------------------
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
//--------------------------------------------------
// updateAgeAndEffortForAllItems()
//--------------------------------------------------
const updateAgeAndEffortForAllItems = () /*: void */ => {
  // For each flwStep in the flwMap...
  getFlwMpSteps().forEach((flwMpStpItems /*: FlwItem[] */) /*: Object */ => {
    // For each flwItem in this step...
    flwMpStpItems.forEach(updateFlwItemProperties);
  });
};

//--------------------------------------------------
// updateFlwItemProperties()
//--------------------------------------------------
const updateFlwItemProperties = (
  flwItem /*: FlwItem */,
  index /*:number */,
) /*: void */ => {
  // If this flwItem is in the backlog, don't update it
  if (gSttngs().flwSteps[flwItem.dFlwStpsIndex].status === "backlog") {
    // console.log(flwItem.name, "is in the backlog.");
    return;
  }
  // Otherwise, increment the age and check if the fwItem has died of old age
  if (++flwItem.dAge >= gSttngs().death) {
    removeFlowItem(flwItem, index);
    return;
  } else {
    makeItOneClickOlder(flwItem);
  }
};

//--------------------------------------------------
// makeItOneClickOlder()
//--------------------------------------------------
const makeItOneClickOlder = (flwItem /*: FlwItem */) /*: void */ => {
  // If the flwItem is not dead, make it more transparent
  if (flwItem.dAge <= gSttngs().death && flwItem.dAge % 1 === 0) {
    flwItem.material.opacity = 1 - flwItem.dAge / gSttngs().death;
    flwItem.material.needsUpdate = true;
  }
  // Update the effort remaining, making sure it doesn't go below 0
  if (--flwItem.dEffrtRemaining < 0) {
    flwItem.dEffrtRemaining = 0;
  }
};

//--------------------------------------------------
// removeFlowItem()
//--------------------------------------------------
const removeFlowItem = (
  flwItem /*: FlwItem */,
  index /*: number */,
) /*: void */ => {
  if (flwItem.dMoving) {
    return;
  }
  let theActualMeshObject = gState().scnData.scene.getObjectByName(
    flwItem.name,
  );
  if (theActualMeshObject !== undefined) {
    // console.log("The mesh object is defined.");
    removeThreeObject(theActualMeshObject);
  } else {
    // Just in case this is still happening and we really couldn't find
    // the actual mesh object, make it red so we can see it
    let colorObject = { color: "#FF0000" };
    let color = new THREE.Color(colorObject.color);
    flwItem.material.color.copy(color);
    flwItem.material.needsUpdate = true;
  }
  // Remove it from the flwMap
  const deletedFlwItem = gState().flwMap[
    flwItem.dFlwStpsIndex.toString()
  ].splice(index, 1);
};

//--------------------------------------------------
// removeThreeObject()
//--------------------------------------------------
const removeThreeObject = (flwItem /*: FlwItem */) /*: void */ => {
  // for better memory management and performance
  if (flwItem.geometry) flwItem.geometry.dispose();

  if (flwItem.material) {
    if (flwItem.material instanceof Array) {
      // for better memory management and performance
      flwItem.material.forEach((material) => material.dispose());
    } else {
      // for better memory management and performance
      flwItem.material.dispose();
    }
  }
  flwItem.removeFromParent(); // the parent might be the scene or another Object3D, but it is sure to be removed this way
};

//--------------------------------------------------
// pullFlwItems()
//--------------------------------------------------
function pullFlwItems() {
  // Get the flwMpSteps  as an array (the flwMap is an "hash map" object)
  const flwMpSteps = getFlwMpSteps();
  // reduceRight() starts at the end of the array and works backwards.
  // For each step, check the limit and, if there is space, pull from
  // the previous step
  flwMpSteps.reduceRight(checkStepLimitAndPull, null);
}

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
    flwMpStpItems.forEach(
      (flwItem /*: FlwItem */, index /*: number */) /*: void */ => {
        // Check if the fwItem has died of old age
        if (flwItem.dAge >= gSttngs().death) {
          return;
        }
        // This will happen when we have used up the availableLimit
        // and we've pulled the last flwItem we can pull
        if (availableLimit === 0) {
          return;
        } else if (availableLimit !== "no limit") {
          // If we have a limit, then decrement it
          availableLimit--;
        }

        if (
          // If the flwMpStpKeyNumber is 0, then we are at the backlog, in
          // which case the dEffrtRemaining is not relevant
          flwMpStpKeyNumber === 0 ||
          // In all other cases, we only want to move the flwItem if it is
          // not moving and it has no effort remaining
          (flwItem.dEffrtRemaining <= 0 && !flwItem.dMoving)
        ) {
          move(flwItem);
          // Remove the flwItem from the current step in the flwMap
          const deletedFlwItem = gState().flwMap[
            flwMpStpKeyNumber.toString()
          ].splice(index, 1);
          // Add the flwItem to the next step in the flwMap
          gState().flwMap[(flwMpStpKeyNumber + 1).toString()].unshift(flwItem);
          // Reset the dEffrtRemaining to the dEffrtTotal, ready for the next step
          flwItem.dEffrtRemaining = flwItem.dEffrtTotal;
        }
      },
    );
  }
};

//--------------------------------------------------
// updateValueQueue()
//--------------------------------------------------
const updateValueQueue = (flwItemValue /*: number */) /*: void */ => {
  if (gState().vQueue.length() >= gSttngs().valueUpdateInterval) {
    gState().vQueue.dequeue();
  }
  gState().vQueue.enqueue(flwItemValue);
};

//--------------------------------------------------
// resizeVSphere()
//--------------------------------------------------
const resizeVSphere = () /*: void */ => {
  if (gState().vQueue.total === 0) {
    return;
  }
  animateScale();
  animatePosition();
};

const animatePosition = () /*: void */ => {
  gState().vSphere.dPosition.z =
    gState().endPosition.z + gState().vSphere.dRadius;

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

//--------------------------------------------------
// filterOutDoneItems()
//--------------------------------------------------
const filterOutDoneItems = () /*: void */ => {
  gState().vSphere.dRllngTtlVolume = 0;
  const doneFlwItems =
    gState().flwMap[(gSttngs().flwSteps.length - 1).toString()];
  if (doneFlwItems.length > 0) {
    updateValueQueue(doneFlwItems.reduce(processDoneFlwItems, 0));
  } else {
    updateValueQueue(0);
  }
};

const processDoneFlwItems = (
  accumulator /*: number */,
  flwItem /*: FlwItem */,
  index /*: number */,
) /*: number */ => {
  gState().doneTotal++;
  // gState().vSphere.dRllngTtlVolume += flwItem.dVolume;
  // theActualMeshObject may be undefined if it has already been removed
  let theActualMeshObject = gState().scnData.scene.getObjectByName(
    flwItem.name,
  );
  if (theActualMeshObject !== undefined) {
    // Remove the mesh object from the scene
    removeThreeObject(theActualMeshObject);
    // Remove it from the flwMap
    const deletedFlwItem = gState().flwMap[
      flwItem.dFlwStpsIndex.toString()
    ].splice(index, 1);
  }
  return accumulator + flwItem.dVolume;
};

export default click;
