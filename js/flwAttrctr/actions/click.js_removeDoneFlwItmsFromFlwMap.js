// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gState from "./gState";
import gSttngs from "./gSttngs";
//------------------------------------------------------------------
// removeDoneFlwItmsFromFlwMap()
//------------------------------------------------------------------
export default (
  _ /*: null | void */,
  flwItem /*: FlwItem */,
  index /*: number */,
) /*: void */ => {
  let dStpIndex = flwItem.dStpIndex;
  if (dStpIndex > gSttngs().get("steps").length - 1) {
    dStpIndex = gSttngs().get("steps").length - 1;
    flwItem.dStpIndex = dStpIndex;
  }
  // Remove it from the flwMap
  const deletedFlwItem = gState()
    .get("flwMap")
    [dStpIndex.toString()].splice(index, 1);
};
