// @flow
//------------------------------------------------------------------
// IMPORTS: GLOBALS
//------------------------------------------------------------------
import gState from "./gState.js";
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// IMPORTS: HELPERS
//------------------------------------------------------------------
import newVSphere from "./newVSphere.js";
//------------------------------------------------------------------
// createValueSphere()
//------------------------------------------------------------------
export const createValueSphere = async () /*: Promise<void> */ => {
  // Create the valueSphere
  gState().set("vSphere", await newVSphere());
  gState().get("vSphere").dRllngTtlVolume = 0;
  gState().get("vSphere").dRadius = gSttngs().get("scale");
  gState().get("vSphere").position.x = gState().get("endPosition").x;
  gState().get("vSphere").position.y = gState().get("endPosition").y;
  gState().get("vSphere").position.z = gState().get("endPosition").z;
  gState().get("vSphere").dPosition.x = gState().get("endPosition").x;
  gState().get("vSphere").dPosition.y = gState().get("endPosition").y;
  gState().get("vSphere").dPosition.z = gState().get("endPosition").z;
  gState().get("clckCbGroup").add(gState().get("vSphere"));
};
export default createValueSphere;
