// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
import expdtIsOn from "./expdtIsOn.js";
//------------------------------------------------------------------
// updateExpdtQueues()
//------------------------------------------------------------------
export default (
  doneFlwItems /*: FlwItem[] | typeof undefined */,
) /*: void */ => {
  if (doneFlwItems === undefined) {
    doneFlwItems = [];
  }
  if (expdtIsOn() === true) {
    updateThroughPutExpQueue(
      [...doneFlwItems].reduce(processThroughPutExp, [0]),
    );
    // Flow Time is based on age of the doneFlwItems
    updateFlowTimeExpQueue([...doneFlwItems].reduce(processFlowTimeExp, []));
  }
};
//------------------------------------------------------------------
// processThroughPutExp()
//------------------------------------------------------------------
export const processThroughPutExp = (
  _ /*: Array<number> */,
  flwItem /*: FlwItem */,
) /*: Array<number> */ => {
  if (flwItem.dExpedite === true) {
    _[0] += 1;
  }
  return _;
};
//------------------------------------------------------------------
// processFlowTimeExp()
//------------------------------------------------------------------
export const processFlowTimeExp = (
  _ /*: Array<number> */,
  flwItem /*: FlwItem */,
) /*: Array<number> */ => {
  if (flwItem.dExpedite === true) {
    _.push(flwItem.dAge);
  }
  return _;
};
//------------------------------------------------------------------
// updateThrouPutExpQueue()
//------------------------------------------------------------------
export const updateThroughPutExpQueue = (
  throughPutExpArray /*: Array<number> */,
) /*: void */ => {
  if (gState().get("thrPtExpQueue").length() >= gSttngs().get("timeBox")) {
    gState().get("thrPtExpQueue").dequeue();
  }
  gState().get("thrPtExpQueue").enqueue(throughPutExpArray);
};
//------------------------------------------------------------------
// updateFlowTimeExpQueue()
//------------------------------------------------------------------
export const updateFlowTimeExpQueue = (
  flwTimeArray /*: Array<number> */,
) /*: void */ => {
  if (gState().get("flwTmExpQueue").length() >= gSttngs().get("timeBox")) {
    gState().get("flwTmExpQueue").dequeue();
  }
  gState().get("flwTmExpQueue").enqueue(flwTimeArray);
};
