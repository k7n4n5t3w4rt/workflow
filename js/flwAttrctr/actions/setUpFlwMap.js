// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// setUpFlwMap()
//------------------------------------------------------------------
export const setUpFlwMap = () /*: void */ => {
  const steps = gSttngs().get("steps");
  const flwMap = {};
  // Set each stepTotal to 0
  if (steps !== undefined) {
    steps.forEach((step /*: FlwStep */, index /*: number */) => {
      flwMap[index.toString()] = [];
    });
  } else {
    setTimeout(() => {
      setUpFlwMap();
    }, 1000);
  }
  gState().set("flwMap", flwMap);
};
export default setUpFlwMap;
