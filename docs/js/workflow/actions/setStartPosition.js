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
  const clckCbGroup = gState().get("clckCbGroup");
  const yOffset = gSttngs().get("yOffset");
  // This is not currently async, so we need to throw an error if
  // clckCbGroup is undefined
  if (clckCbGroup === undefined) throw new Error("clckCbGroup is undefined");
  if (yOffset === "null") throw new Error("yOffset is null");
  // Otherwise, we can set the start position
  const strtPosition = clckCbGroup.clckCube.position.clone();
  strtPosition.y = yOffset;
  gState().set("strtPosition", strtPosition);
};
export default setStartPosition;
