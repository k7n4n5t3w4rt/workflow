// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import clckCbGroup from "./newClickCubeGroup.js";
//------------------------------------------------------------------
// createClickCubeGroup()
//------------------------------------------------------------------
export const createClickCubeGroup = () => {
  gState().set("clckCbGroup", clckCbGroup());
  // --------------------------------------------------------------
  // AUTOMODE
  // --------------------------------------------------------------
  if (gSttngs().get("autoMode") == true) {
    gState().get("clckCbGroup").clckCube.position.z +=
      gSttngs().get("step") * gSttngs().get("steps").length + 15;
    gState().get("clckCbGroup").position.y -= gSttngs().get("yOffset");
  }
  gState().get("scnData").scene.add(gState().get("clckCbGroup"));
};
export default createClickCubeGroup;
