// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
import * as THREE from "three";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import anime from "animejs";
import animateScaleToZero from "./animateScaleToZero.js";
import removeFlowItem from "./removeFlowItem.js";
import calculateNewPosition from "./calculateNewPosition.js";

//------------------------------------------------------------------
// moveDisplay()
//------------------------------------------------------------------
export default (flwItem /*: Object */) /*: void */ => {
  if (flwItem.dMoving === false) {
    animateColorChange(flwItem, newColor(flwItem));
    animatePositionChange(flwItem);
  }
};

//------------------------------------------------------------------
// animatePositionChange()
//------------------------------------------------------------------
const animatePositionChange = (flwItem /*: FlwItem */) /*: void */ => {
  anime({
    targets: [flwItem.position],
    x: flwItem.dPosition.x,
    y: flwItem.dPosition.y,
    z: flwItem.dPosition.z,
    duration: 1000 / (gSttngs().get("fps") >= 1 ? gSttngs().get("fps") : 1),
    delay: 0,
    easing: "easeInOutCirc",
    complete: () => onMoveComplete(flwItem),
  });
};

//------------------------------------------------------------------
// onMoveComplete()
//------------------------------------------------------------------
const onMoveComplete = (flwItem /*: FlwItem */) /*: void */ => {
  flwItem.dMoving = false;
  if (gSttngs().get("steps")[flwItem.dStpIndex].status === "done") {
    if (flwItem.dPosition.z === gState().get("endPosition").z) {
      flwItem.visible = false;
      removeFlowItem(flwItem);
    } else {
      // This recursive call is for items that are 'done' but not yet
      // at the final end position.
      flwItem.dPosition = { ...calculateNewPosition(flwItem) };
      animatePositionChange(flwItem);
    }
  }
};

//------------------------------------------------------------------
// animateColorChange()
//------------------------------------------------------------------
const animateColorChange = (
  flwItem /*: FlwItem */,
  newColor /*: string */,
) /*: void */ => {
  let oldColor = { color: flwItem.dColor };
  flwItem.dColor = newColor;

  anime({
    targets: oldColor,
    color: newColor,
    duration: 1000,
    easing: "linear",
    update: function () {
      let color = new THREE.Color(oldColor.color);
      flwItem.material.color.copy(color);
      flwItem.material.needsUpdate = true;
    },
  });
};

//------------------------------------------------------------------
// newColor()
//------------------------------------------------------------------
const newColor = (flwItem /*: FlwItem */) /*: string */ => {
  const nextStatus = gSttngs().get("steps")[flwItem.dStpIndex].status;
  let newColor = "#" + gSttngs().get("colorGrey");

  if (nextStatus === "touch" || nextStatus === "done") {
    newColor = "#" + gSttngs().get("colorGold");
    if (flwItem.dExpedite == true) {
      newColor = "#" + gSttngs().get("colorGreen");
    }
  }
  return newColor;
};
