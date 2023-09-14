// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import anime from "../../../web_modules/animejs.js";
import flwItmTracker from "./flwItmTracker.js";
import calculateRange from "./calculateRange.js";
import rndmPosOrNeg from "./rndmPosOrNeg.js";
import animateScaleToZero from "./animateScaleToZero.js";
import rndmBetween from "./rndmBetweenWhatever.js";
import calculateZPosFromStep from "./calculateZPosFromStep.js";
import hexToHSL from "./hexToHSL.js";
import setInstanceColor from "./setInstanceColor.js";
//------------------------------------------------------------------
// FUNCTION: move()
//------------------------------------------------------------------
export const move = (flwItem /*: Object */) /*: void */ => {
  // animateColorChange(flwItem, newColor(flwItem));
  flwItem.dPosition = { ...refineNewPosition(flwItem) };
  animatePositionChange(flwItem);
};
export default move;
//------------------------------------------------------------------
// animatePositionChange()
//------------------------------------------------------------------
const animatePositionChange = (flwItem /*: CbInstance */) /*: void */ => {
  // Set the properties of the flwItem to the state they'll
  // should be in when the animation is complete.
  flwItem.dMoving = true;
  flwItem.dStpIndex++;
  // We don't want to reset the days remaining if the item is
  // in the last step, i.e. Done
  if (flwItem.dStpIndex < gSttngs().get("steps").length - 1) {
    flwItem.dDysRmnngThisStep = flwItem.dDysEachTouchStep;
  }
  const instncdCbMesh = gState().get("instncdCbMesh");
  const fps = gSttngs().get("fps");

  const dummyPosition /*: { x: number, y: number, z: number } */ = {
    x: flwItem.dPosition.x,
    y: flwItem.dPosition.y,
    z: flwItem.dPosition.z,
  };

  anime({
    targets: dummyPosition,
    x: flwItem.dPosition.x,
    y: flwItem.dPosition.y,
    z: flwItem.dPosition.z,
    duration: 1000 / (fps >= 1 ? fps : 1),
    delay: 0,
    easing: "easeInOutCirc",
    update: () => {
      setInstancePosition(
        instncdCbMesh,
        flwItem,
        new THREE.Vector3(dummyPosition.x, dummyPosition.y, dummyPosition.z),
      );
    },
    complete: (anim) /*: void */ => {
      flwItem.dMoving = false;
      if (gSttngs().get("steps")[flwItem.dStpIndex].status === "done") {
        const matrix = new THREE.Matrix4().scale(new THREE.Vector3(0, 0, 0));
        instncdCbMesh.setMatrixAt(flwItem.index, matrix);
        instncdCbMesh.instanceMatrix.needsUpdate = true;
        animateScaleToZero(flwItem, 300, () => {});
        // Add this CbInstanc back into the inctvCbInstances array
        //
      }
    },
  });
};
//------------------------------------------------------------------
// setInstancePosition()
//------------------------------------------------------------------
const setInstancePosition = (
  instncdCbMesh /*: Object */,
  flwItem /*: CbInstance */,
  position /*: Object */,
) /*: void */ => {
  const matrix /*: Object */ = new THREE.Matrix4();

  instncdCbMesh.getMatrixAt(flwItem.index, matrix);
  matrix.compose(position, flwItem.dQuaternion, flwItem.dScale);
  instncdCbMesh.setMatrixAt(flwItem.index, matrix);
  instncdCbMesh.instanceMatrix.needsUpdate = true;
};
//------------------------------------------------------------------
// animateColorChange()
//------------------------------------------------------------------
const animateColorChange = (
  flwItem /*: CbInstance */,
  newColor /*: string */,
) /*: void */ => {
  const instncdCbMesh = gState().get("instncdCbMesh");
  // Convert colors to THREE.Color format
  const oldColorObj = new THREE.Color(flwItem.dColor);
  const targetHSL = hexToHSL(newColor);

  // Store initial HSL values
  const oldHSL = oldColorObj.getHSL({ h: 0, s: 0, l: 0 });

  // Animate HSL differences, not direct color values for smooth transition
  const hslDifference = {
    h: targetHSL.h - oldHSL.h,
    s: targetHSL.s - oldHSL.s,
    l: targetHSL.l - oldHSL.l,
  };

  const currentHSL = { ...oldHSL };

  anime({
    targets: currentHSL,
    h: oldHSL.h + hslDifference.h,
    s: oldHSL.s + hslDifference.s,
    l: oldHSL.l + hslDifference.l,
    duration: 1000,
    easing: "linear",
    // Update the instance's color on each frame.
    update: function () {
      const color = new THREE.Color().setHSL(
        currentHSL.h,
        currentHSL.s,
        currentHSL.l,
      );
      setInstanceColor(flwItem.index, color);
    },
    complete: function () {
      flwItem.dColor = newColor; // Update the flwItem's color property to the new color.
    },
  });
};
//------------------------------------------------------------------
// newColor()
//------------------------------------------------------------------
const newColor = (flwItem /*: CbInstance */) /*: string */ => {
  const nextStatus = gSttngs().get("steps")[flwItem.dStpIndex + 1].status;
  let newColor = "#" + gSttngs().get("colorGrey"); // Grey for "waiting" status
  if (nextStatus === "touch" || nextStatus === "done") {
    newColor = "#" + gSttngs().get("colorGold"); // Gold for "touch" status
    if (flwItem.dExpedite == true) {
      newColor = "#" + gSttngs().get("colorGreen"); // Green for "touch" status
    }
  }
  return newColor;
};
//------------------------------------------------------------------
// refineNewPosition()
//------------------------------------------------------------------
const refineNewPosition = (
  flwItem /*: CbInstance */,
) /*: ThrMeshPosition */ => {
  const range = calculateRange(flwItem.dStpIndex + 1);
  const newPosition = { ...flwItem.dPosition };
  const nextStatus = gSttngs().get("steps")[flwItem.dStpIndex + 1].status;

  if (nextStatus === "done") {
    newPosition.x = gState().get("vSphere").dPosition.x;
    newPosition.y = gState().get("vSphere").dPosition.y;
    newPosition.z = gState().get("endPosition").z;

    animateScaleToZero(flwItem);
  } else {
    newPosition.x =
      gState().get("strtPosition").x +
      (Math.round(rndmPosOrNeg() * rndmBetween(0, range) * 100) / 100) *
        rndmPosOrNeg();
    newPosition.y =
      gState().get("strtPosition").y +
      (Math.round(rndmBetween(0, range) * 100) / 100) * rndmPosOrNeg();
    newPosition.z = calculateZPosFromStep(flwItem.dStpIndex + 1);
  }
  return newPosition;
};
