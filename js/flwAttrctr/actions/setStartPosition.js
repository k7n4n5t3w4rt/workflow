// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// setStartPosition()
//------------------------------------------------------------------
export const setStartPosition = () /*: void */ => {
  // Set the start position for all the flw items
  // based on where we put the cube, but higher up
  const clckCbGroup = gState().get("clckCbGroup") || {};
  const yOffset = gSttngs().get("yOffset") || 0;
  if (clckCbGroup !== {} && yOffset !== 0) {
    // Otherwise, we can set the start position
    const strtPosition = clckCbGroup.clckCube.position.clone();
    strtPosition.y = yOffset;
    gState().set("strtPosition", strtPosition);
  } else {
    setTimeout(setStartPosition, 1000);
    gState().set("strtPosition", { x: 0, y: 0, z: 0 });
    console.log(
      "setStartPosition(): Waiting for `clckCbGroup` of `yOffset` to be set",
    );
  }
};
export default setStartPosition;
