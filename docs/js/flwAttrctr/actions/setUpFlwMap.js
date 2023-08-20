// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// setUpFlwMap(gFlwMap, gFlwSteps)
//------------------------------------------------------------------
export const setUpFlwMap = (gFlwMap /*: FlwMap */) /*: void */ => {
  const gFlwSteps = gSttngs().get("steps");
  // Set each stepTotal to 0
  if (gFlwSteps !== undefined) {
    gFlwSteps.forEach((step /*: FlwStep */, index /*: number */) => {
      gState().get("flwMap")[index.toString()] = [];
    });
  } else {
    setTimeout(() => {
      setUpFlwMap(gFlwMap);
    }, 1000);
  }
};
export default setUpFlwMap;
