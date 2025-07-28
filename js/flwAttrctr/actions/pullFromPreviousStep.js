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
    // // Pull the expedited flwItems first
    // let expediteFlag = true;
    // const nrmlAvailableLimit = flwItems.reduce(
    //   pullFlowItem(expediteFlag, move, updateFlowMap),
    //   availableLimit,
    // );
    // I took out the expedite logic because it is not needed, currently
    // so now we just use the availableLimit as the limit
    let nrmlAvailableLimit = availableLimit;
    // The expedite logic is still in the pullFlowItem() function but
    // we want to ignore it
    let expediteFlag = false;
    // The reduceRight() is important because deep in pullFlowItem(), there is a call to updateFlowMap(), which splices the flwItems array. If we don't go from the end to the beginning, we will skip some items as te array indices change.
    flwItems.reduceRight(
      pullFlowItem(expediteFlag, move, updateFlowMap),
      nrmlAvailableLimit,
    );
  } else {
  }
};
export default pullFromPreviousStep;
