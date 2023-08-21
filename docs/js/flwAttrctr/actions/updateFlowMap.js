// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gState from "./gState.js";
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// updateFlowMap()
//------------------------------------------------------------------
export default (flwItem /*: FlwItem */, index /*: number */) => {
  let dStpIndex = flwItem.dStpIndex;
  if (dStpIndex > gSttngs().get("steps").length - 1) {
    dStpIndex = gSttngs().get("steps").length - 1;
    flwItem.dStpIndex = dStpIndex;
  }
  // Remove the flwItem from the current step in the flwMap
  // NOTE: The flwItem.dStpIndex was updated in the move() function
  // so we need to use -1 to get the flwMap step we want
  const deletedFlwItem = gState()
    .get("flwMap")
    [(dStpIndex - 1).toString()].splice(index, 1);
  // Add the flwItem to the correct step in the flwMap
  gState().get("flwMap")[dStpIndex.toString()].push(flwItem);
};
