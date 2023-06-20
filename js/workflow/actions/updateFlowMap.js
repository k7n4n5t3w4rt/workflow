// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gState from "./gState.js";
//------------------------------------------------------------------
// updateFlowMap()
//------------------------------------------------------------------
export default (flwItem /*: FlwItem */, index /*: number */) => {
  // Remove the flwItem from the current step in the flwMap
  // NOTE: The flwItem.dStpIndex was updated in the move() function
  // so we need to use -1 to get the flwMap step we want
  const deletedFlwItem = gState().flwMap[
    (flwItem.dStpIndex - 1).toString()
  ].splice(index, 1);
  // Add the flwItem to the correct step in the flwMap
  gState().flwMap[flwItem.dStpIndex.toString()].push(flwItem);
};
