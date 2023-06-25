// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import pullFlowItem from "./pullFlowItem.js";
import move from "./move.js";
import updateFlowMap from "./updateFlowMap.js";

//------------------------------------------------------------------
// pullFromPreviousStep()
//------------------------------------------------------------------
export default (
  flwStpIndex /*: number */,
  availableLimit /*: "no limit" | number */,
) => {
  // We could be at the beginning of the flow map
  if (flwStpIndex < 0) {
    return;
  }
  const stpKey = flwStpIndex.toString();
  const flwItems = gState().get("flwMap")[stpKey];
  if (flwItems.length > 0) {
    // Pull the expedited flwItems first
    let expediteFlag = true;
    const nrmlAvailableLimit = flwItems.reduce(
      pullFlowItem(expediteFlag, move, updateFlowMap),
      availableLimit,
    );
    expediteFlag = false;
    flwItems.reduce(
      pullFlowItem(expediteFlag, move, updateFlowMap),
      nrmlAvailableLimit,
    );
  } else {
  }
};
