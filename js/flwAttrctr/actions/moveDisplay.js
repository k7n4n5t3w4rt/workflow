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

    // Check if the item is moving to the "done" state
    const isDoneState =
      gSttngs().get("steps")[flwItem.dStpIndex].status === "done";

    if (isDoneState) {
      // For items moving to "done", animate position and scale simultaneously
      animatePositionAndScale(flwItem);
    } else {
      // For other items, just animate position
      animatePositionChange(flwItem);
    }
  }
};

//------------------------------------------------------------------
// animatePositionChange() - For non-done items
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
// animatePositionAndScale() - For items moving to "done" state
//------------------------------------------------------------------
const animatePositionAndScale = (flwItem /*: FlwItem */) /*: void */ => {
  // Get target position
  const targetX = flwItem.dPosition.x;
  const targetY = flwItem.dPosition.y;
  const targetZ = flwItem.dPosition.z;

  // Get starting position
  const startX = flwItem.position.x;
  const startY = flwItem.position.y;
  const startZ = flwItem.position.z;

  // Get value sphere position (destination for done items)
  const vSphere = gState().get("vSphere");
  const vSphereX = vSphere.dPosition.x;
  const vSphereY = vSphere.dPosition.y;

  // Calculate the starting distance and scale
  const startDistanceX = Math.abs(startX - vSphereX);
  const startDistanceY = Math.abs(startY - vSphereY);
  const startDistance = Math.sqrt(
    startDistanceX * startDistanceX + startDistanceY * startDistanceY,
  );

  // Create animation objects for position and scale
  const positionObj = { x: startX, y: startY, z: startZ };
  const scaleObj = { factor: flwItem.dScale || 1 };

  // Animation duration
  const duration =
    1000 / (gSttngs().get("fps") >= 1 ? gSttngs().get("fps") : 1);

  // Mark as moving
  flwItem.dMoving = true;

  // Animate both position and scale simultaneously
  anime({
    targets: [positionObj, scaleObj],
    x: targetX,
    y: targetY,
    z: targetZ,
    factor: [scaleObj.factor, 0.1], // Scale down to 0.1
    duration: duration,
    easing: "easeInOutCirc",
    update: function () {
      // Update position
      flwItem.position.x = positionObj.x;
      flwItem.position.y = positionObj.y;
      flwItem.position.z = positionObj.z;

      // Calculate current distance to value sphere
      const currentDistanceX = Math.abs(positionObj.x - vSphereX);
      const currentDistanceY = Math.abs(positionObj.y - vSphereY);
      const currentDistance = Math.sqrt(
        currentDistanceX * currentDistanceX +
          currentDistanceY * currentDistanceY,
      );

      // Calculate scale factor based on distance ratio
      const distanceRatio = currentDistance / startDistance;
      const scaleFactor = Math.max(0.1, distanceRatio * flwItem.dScale);

      // Update scale
      flwItem.scale.x = scaleObj.factor;
      flwItem.scale.y = scaleObj.factor;
      flwItem.scale.z = scaleObj.factor;
    },
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

      // Use the combined position and scale animation for done items
      animatePositionAndScale(flwItem);
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
