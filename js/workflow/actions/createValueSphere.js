// @flow
//------------------------------------------------------------------
// IMPORTS: GLOBALS
//------------------------------------------------------------------
import gState from "./gState.js";
import newVSphere from "./newVSphere.js";
//------------------------------------------------------------------
// createValueSphere()
//------------------------------------------------------------------
export const createValueSphere = async () => {
  // Create the valueSphere
  gState().set("vSphere", await newVSphere());
  gState().get("vSphere").dRllngTtlVolume = 0;
  gState().get("vSphere").dRadius = 0;
  gState().get("vSphere").position.x = 0;
  gState().get("vSphere").position.y = gState().get("endPosition").y;
  gState().get("vSphere").position.z = gState().get("endPosition").z;
  gState().get("vSphere").dPosition.x = 0;
  gState().get("vSphere").dPosition.y = gState().get("endPosition").y;
  gState().get("vSphere").dPosition.z = gState().get("endPosition").z;
  gState().get("clckCbGroup").add(gState().get("vSphere"));
};
export default createValueSphere;
