// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// setEndPosition()
//------------------------------------------------------------------
export const setEndPosition = () => {
  gState().set("endPosition", gState().get("strtPosition").clone());
  gState().get("endPosition").z +=
    gSttngs().get("step") * (gSttngs().get("steps").length + 0.5) * -1;
  gSttngs().set("vSphereX", gState().get("endPosition").x);
  gSttngs().set("vSphereY", gState().get("endPosition").y);
  gSttngs().set("vSphereZ", gState().get("endPosition").z);
  // --------------------------------------------------------------
  // AUTOMODE
  // --------------------------------------------------------------
  if (gSttngs().get("autoMode")) {
    gState().get("clckCbGroup").position.x += 15.3;
    gState().get("clckCbGroup").position.z -= 4;
    // gState().get("endPosition").z -=
    //   gSttngs().get("step") * gSttngs().get("steps").length + 2;
  }
};
export default setEndPosition;
