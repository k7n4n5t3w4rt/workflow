// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gState from "./gState.js";
//------------------------------------------------------------------
// removeDoneFlwItmsFromFlwMap()
//------------------------------------------------------------------
export default (
  _ /*: null | void */,
  flwItem /*: FlwItem */,
  index /*: number */,
) /*: void */ => {
  // Remove it from the flwMap
  const deletedFlwItem = gState().flwMap[flwItem.dStpIndex.toString()].splice(
    index,
    1,
  );
};
