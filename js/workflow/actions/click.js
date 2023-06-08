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
  flwMpSteps.forEach(
    (flwMpStep /*: FlwMpItems */, flwStpIndex /*: number */) /*: void */ => {
      const flwMpStpItmKeys = Object.keys(flwMpStep);
      const flwMpStpItems = flwMpStpItmKeys.map(
        (flwMpStpItmKey /*: string */) /*: void | FlwItem */ => {
          return flwMpStep[flwMpStpItmKey];
        },
      );
      const thisFlwMpIndex = 6 - flwStpIndex;
      if (
        gState().flwMap[(thisFlwMpIndex - 1).toString()] !== undefined &&
        Object.keys(gState().flwMap[(thisFlwMpIndex - 1).toString()]).length > 0
      ) {
        const flwStpLimit = gSttngs().flwSteps[flwStpIndex].limit;
        if (flwMpStpItems.length < flwStpLimit || flwStpLimit === 0) {
          console.log(
            `There is room for one more in gSttngs().flwSteps[${
              6 - flwStpIndex
            }]`,
          );
          console.log(gState().flwMap[(6 - flwStpIndex).toString()]);
        }
      } else {
        console.log(
          `gState().flwMap[${thisFlwMpIndex - 1}] is empty.  No need to pull.`,
        );
      }
    },
  );
}

function getFlwMpSteps() /*: FlwMpItems[] */ {
  // gState().flwMap...
  const flwMpStpKeys = Object.keys(gState().flwMap);
  const flwMpSteps = flwMpStpKeys
    .map((flwMpStpKey /*: string */) /*: FlwMpItems */ => {
      return gState().flwMap[flwMpStpKey];
    })
    .reverse();
  return flwMpSteps;
}

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
  const doneFlwItems = Object.keys(
    gState().flwMap[(gSttngs().flwSteps.length - 1).toString()],
  );
  doneFlwItems.forEach(processDoneFlwItems);
}

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
function updateAgeOrRemoveFromScene(flwItem /*: FlwItem */) {
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
}

export default click;
