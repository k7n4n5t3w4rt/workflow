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
        filterOutDoneItems();
        resizeVSphere();
      }
      newFlwItem();
      pullFlwItems();
      click();
    },
  });
};

//--------------------------------------------------
// pullFlwItems()
//--------------------------------------------------
function pullFlwItems() {
  const flwMpSteps = getFlwMpSteps();
  // reduceRight() starts at the end of the array and works backwards
  flwMpSteps.reduceRight(checkFlowStepLimitAndPullFromPreviousStep);
}

const getFlwMpSteps = () /*: FlwMpItems[] */ => {
  // gState().flwMap...
  const flwMpStpKeys = Object.keys(gState().flwMap);
  const flwMpSteps = flwMpStpKeys.map(
    (flwMpStpKey /*: string */) /*: FlwMpItems */ => {
      return gState().flwMap[flwMpStpKey];
    },
  );
  return flwMpSteps;
};

const checkFlowStepLimitAndPullFromPreviousStep = (
  _ /*: void */, // The accumulator is not used but reduceRight() requires it
  flwMpStep /*: FlwMpItems */,
  flwMpStpKeyNumber /*: number */,
) /*: void */ => {
  // Turn the array of keys into an array of flwItem objects
  const flwMpStpItmKeys = Object.keys(flwMpStep);
  const flwMpStpItems = flwMpStpItmKeys.map(
    (flwMpStpItmKey /*: string */) /*: FlwItem */ => {
      return flwMpStep[flwMpStpItmKey];
    },
  );
  // Get the limit of the current step
  const flwStpLimit = gSttngs().flwSteps[flwMpStpKeyNumber].limit;
  // A limit of 0 means no limit
  if (flwMpStpItems.length < flwStpLimit || flwStpLimit === 0) {
    let availableLimit /*: "no limit" | 0 | number */ = 0;
    // Confusingly, if the limit is 0, then there is no limit
    // to the availableLimit
    if (flwStpLimit === 0) {
      availableLimit = "no limit";
    } else {
      // This will be between 1 and the flow step limit
      availableLimit = flwStpLimit - flwMpStpItems.length;
    }
    console.log(
      `There is room for one more in gSttngs().flwSteps[${flwMpStpKeyNumber}]`,
      gState().flwMap[flwMpStpKeyNumber.toString()],
    );
    pullFromPreviousStep(flwMpStpKeyNumber - 1, availableLimit);
  }
};

const pullFromPreviousStep = (
  flwMpStpKeyNumber /*: number */,
  availableLimit /*: "no limit" | number */,
) /*: void */ => {
  if (flwMpStpKeyNumber < 0) {
    return;
  }
  const flwMpStep = gState().flwMap[flwMpStpKeyNumber.toString()];

  if (flwMpStep !== undefined && Object.keys(flwMpStep).length > 0) {
    // Turn the array of keys into an array of flwItem objects
    const flwMpStpItmKeys = Object.keys(flwMpStep);
    const flwMpStpItems = flwMpStpItmKeys.map(
      (flwMpStpItmKey /*: string */) /*: FlwItem */ => {
        return flwMpStep[flwMpStpItmKey];
      },
    );
    flwMpStpItems.forEach((flwItem /*: FlwItem */) /*: void */ => {
      if (flwItem.dAge >= gSttngs().death) {
        delete gState().flwMap[flwMpStpKeyNumber.toString()][flwItem.name];
        return;
      }

      if (availableLimit === 0) {
        return;
      } else if (availableLimit !== "no limit") {
        availableLimit--;
      }

      if (flwItem.dEffrtRemaining <= 0 && !flwItem.dMoving) {
        move(flwItem, flwMpStpKeyNumber);
      }
    });
  } else {
    console.log(
      `gState().flwMap[${flwMpStpKeyNumber}] is empty (or undefined).  Nothing to pull.`,
    );
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
  // console.log("// --------------------------------------------------");
  // console.log("volume", volume);
  // console.log("radius", radius);
  // console.log("// --------------------------------------------------");
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
  gState().scnData.scene.remove(
    gState().scnData.scene.getObjectByName(flwItem.name),
  );
  // Assuming the dFlwStpsIndex is correct, remove it from the flwMap
  delete gState().flwMap[flwItem.dFlwStpsIndex.toString()][flwItem.name];
};

//--------------------------------------------------
// updateAgeOrRemoveFromScene()
//--------------------------------------------------
const updateAgeOrRemoveFromScene = (flwItem /*: FlwItem */) /*: void */ => {
  if (flwItem.dAge < gSttngs().death) {
    flwItem.dAge++;
    if (flwItem.dAge <= gSttngs().death && flwItem.dAge % 10 === 0) {
      flwItem.material.opacity = 1 - flwItem.dAge / gSttngs().death;
      flwItem.material.needsUpdate = true;
    }
  } else {
    // console.log(`WorkFlowItem ${flwItem.name} is too old.`);
    delete gState().flwMap[flwItem.dFlwStpsIndex.toString()][flwItem.name];
    gState().scnData.scene.remove(
      gState().scnData.scene.getObjectByName(flwItem.name),
    );
    // Remove it from the flwMap
    delete gState().flwMap[flwItem.dFlwStpsIndex.toString()][flwItem.name];
  }
};

export default click;
