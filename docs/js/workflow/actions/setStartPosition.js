// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// setStartPosition()
//------------------------------------------------------------------
export const setStartPosition = () => {
  // Set the start position for all the flw items
  // based on where we put the cube, but higher up
  gState().set(
    "strtPosition",
    gState().get("clckCbGroup").clckCube.position.clone(),
  );
  gState().get("strtPosition").y = gSttngs().get("yOffset");
};
export default setStartPosition;
