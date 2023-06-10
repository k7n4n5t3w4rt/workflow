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
  // Rotate the clckCube
  anime({
    targets: [gState().clckCbGroup.clckCube.rotation],
    y: gState().clckCbGroup.clckCube.rotation.y + Math.PI / 2,
    duration: 1000,
    easing: "easeInOutSine",
    complete: () /*: void */ => {
      // || gState().clicks < gSttngs().valueUpdateInterval
      if (gState().clicks % gSttngs().valueUpdateInterval === 0) {
        console.log("flwMap:", gState().flwMap);
        filterOutDoneItems();
        resizeVSphere();
      }
      updateAgeAndEffortForAllItems();
      newFlwItem();
      pullFlwItems();
      click();
    },
  });
};

//--------------------------------------------------
// updateAgeAndEffortForAllItems()
//--------------------------------------------------
const updateAgeAndEffortForAllItems = () /*: void */ => {
  getFlwMpSteps().forEach(getFlwMpStpItems);
};

const getFlwMpStpItems = (
  flwMpStep /*: FlwMpItems */,
  flwMpStpKeyNumber /*: number */,
) /*: Object */ => {
  // Turn the array of keys into an array of flwItem objects
  const flwMpStpItmKeys = Object.keys(flwMpStep);
  const flwMpStpItems = flwMpStpItmKeys.map(
    (flwMpStpItmKey /*: string */) /*: FlwItem */ => {
      return flwMpStep[flwMpStpItmKey];
    },
  );
  // For each flwItem in this step...
  flwMpStpItems.forEach(updateFlwItemProperties);
};

const updateFlwItemProperties = (flwItem /*: FlwItem */) /*: void */ => {
  // Check if the fwItem has died of old age
  if (++flwItem.dAge >= gSttngs().death) {
    let theActualMeshObject = gState().scnData.scene.getObjectByName(
      flwItem.name,
    );
    if (theActualMeshObject !== undefined) {
      console.log(flwItem.name, "has died of old age.");
      removeThreeObject(theActualMeshObject);
      // Remove it from the flwMap
      delete gState().flwMap[flwItem.dFlwStpsIndex.toString()][flwItem.name];
    }
    return;
  } else {
    if (flwItem.dAge <= gSttngs().death && flwItem.dAge % 1 === 0) {
      flwItem.material.opacity = 1 - flwItem.dAge / gSttngs().death;
      flwItem.material.needsUpdate = true;
    }
  }
  // Update the effort remaining
  if (--flwItem.dEffrtRemaining < 0) {
    flwItem.dEffrtRemaining = 0;
  }
};

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

const checkStepLimitAndPull = (
  // Note: We need the accumulator or the Done step is skipped. MDN:
  //"The first time the function is called, the accumulator and currentValue
  // can be one of two values. If an initialValue was provided in the call to
  // reduceRight, then accumulator will be equal to initialValue and currentValue
  // will be equal to the last value in the array. If no initialValue was provided,
  // then accumulator will be equal to the last value in the array and currentValue
  // will be equal to the second-to-last value."
  _ /*: null | void */, // The accumulator is not used but reduceRight() requires it
  flwMpStep /*: FlwMpItems */,
  flwMpStpKeyNumber /*: number */,
) /*: void */ => {
  // flwMpStep is a hash map of flwItems, so we need to get the array of
  // keys into an array of flwItem objects
  const flwMpStpItmKeys = Object.keys(flwMpStep);
  const flwMpStpItems = flwMpStpItmKeys.map(
    (flwMpStpItmKey /*: string */) /*: FlwItem */ => {
      return flwMpStep[flwMpStpItmKey];
    },
  );
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

const pullFromPreviousStep = (
  flwMpStpKeyNumber /*: number */,
  availableLimit /*: "no limit" | number */,
) /*: void */ => {
  // We could be at the 'beginning' of the flow map
  if (flwMpStpKeyNumber < 0) {
    return;
  }
  // Get the flwMpStep as a hash map of flwItem keys
  const flwMpStep = gState().flwMap[flwMpStpKeyNumber.toString()];
  // If there are no flwItems in this step, then there is nothing to pull
  if (Object.keys(flwMpStep).length > 0) {
    // Turn the array of keys into an array of flwItem objects
    const flwMpStpItmKeys = Object.keys(flwMpStep);
    const flwMpStpItems = flwMpStpItmKeys.map(
      (flwMpStpItmKey /*: string */) /*: FlwItem */ => {
        return flwMpStep[flwMpStpItmKey];
      },
    );
    // For each flwItem in this step...
    flwMpStpItems.forEach((flwItem /*: FlwItem */) /*: void */ => {
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
        move(flwItem, flwMpStpKeyNumber);
        // Remove the flwItem from the current step in the flwMap
        delete gState().flwMap[flwMpStpKeyNumber.toString()][flwItem.name];
        // Add the flwItem to the next step in the flwMap
        gState().flwMap[(flwMpStpKeyNumber + 1).toString()][flwItem.name] =
          flwItem;
        // Reset the dEffrtRemaining to the dEffrtTotal, ready for the next step
        flwItem.dEffrtRemaining = flwItem.dEffrtTotal;
      }
    });
  }
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
const resizeVSphere = () /*: void */ => {
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
  const doneFlwItems = Object.keys(
    gState().flwMap[(gSttngs().flwSteps.length - 1).toString()],
  );
  doneFlwItems.forEach(processDoneFlwItems);
};

const processDoneFlwItems = (flwItemName /*: string */) /*: void */ => {
  const flwItem =
    gState().flwMap[(gSttngs().flwSteps.length - 1).toString()][flwItemName];
  gState().doneTotal++;
  gState().vSphere.dRllngTtlVolume += flwItem.dVolume;
  // theActualMeshObject may be undefined if it has already been removed
  let theActualMeshObject = gState().scnData.scene.getObjectByName(
    flwItem.name,
  );
  if (theActualMeshObject !== undefined) {
    // Remove the mesh object from the scene
    removeThreeObject(theActualMeshObject);
    // Remove it from the flwMap
    delete gState().flwMap[flwItem.dFlwStpsIndex.toString()][flwItem.name];
  }
};

export default click;
