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
//------------------------------------------------------------------
// animateScaleToZero()
//------------------------------------------------------------------
export const animateScaleToZero = (
  flwItem /*: CbInstance */,
  duration /*: number */ = 1200,
  completeFunction /*: function */ = () => {},
) /*: void */ => {
  const instncdCbMesh = gState().get("instncdCbMesh");
  let scaleObject = {
    x: flwItem.dScale,
    y: flwItem.dScale,
    z: flwItem.dScale,
  };
  flwItem.dMoving = true;
  anime({
    targets: [scaleObject],
    x: 0,
    y: 0,
    z: 0,
    duration: duration,
    easing: "linear",
    // Update the instance's scale on each frame.
    update: function () {
      const matrix = new THREE.Matrix4();
      const quaternion = new THREE.Quaternion();
      const position = new THREE.Vector3();
      instncdCbMesh.getMatrixAt(flwItem.index, matrix);
      matrix.decompose(position, quaternion, new THREE.Vector3());
      const newMatrix = new THREE.Matrix4();
      newMatrix.compose(
        position,
        quaternion,
        new THREE.Vector3(scaleObject.x, scaleObject.y, scaleObject.z),
      );
      instncdCbMesh.setMatrixAt(flwItem.index, newMatrix);
      instncdCbMesh.instanceMatrix.needsUpdate = true;
    },
    complete: completeFunction,
  });
};
export default animateScaleToZero;
