// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gState from "./gState";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import pullFlowItem from "./pullFlowItem";
import move from "./click.js_move";
import updateFlowMap from "./updateFlowMap";
//------------------------------------------------------------------
// FUNCTION: pullFromPreviousStep()
//------------------------------------------------------------------
export const pullFromPreviousStep = (
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
export default pullFromPreviousStep;
