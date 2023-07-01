// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gState from "./gState.js";
//------------------------------------------------------------------
// setUpFlwMap(gFlwMap, gFlwSteps)
//------------------------------------------------------------------
export default (gFlwMap /*: FlwMap */, gFlwSteps /*: FlwStep[] */) => {
  // Set each stepTotal to 0
  gFlwSteps.forEach((step /*: FlwStep */, index /*: number */) => {
    gState().get("flwMap")[index.toString()] = [];
  });
};
