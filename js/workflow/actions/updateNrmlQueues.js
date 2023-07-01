// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
import expdtIsOn from "./expdtIsOn.js";
//------------------------------------------------------------------
// updateQueues()
//------------------------------------------------------------------
export default (
  doneFlwItems /*: FlwItem[] */,
  removeDoneFlwItmsFromFlwMap /*: (_:null|void, flwItem:FlwItem, index:number) => void */,
) /*: void */ => {
  updateThroughPutQueue([...doneFlwItems].reduce(processThroughPut, [0]));
  updateFlowTimeQueue([...doneFlwItems].reduce(processFlowTime, []));
};
//------------------------------------------------------------------
// processThroughPut()
//------------------------------------------------------------------
export const processThroughPut = (
  _ /*: Array<number> */,
  flwItem /*: FlwItem */,
) /*: Array<number> */ => {
  if (expdtIsOn() === false || flwItem.dExpedite === false) {
    _[0] += 1;
  }
  return _;
};
//------------------------------------------------------------------
// processFlowTime()
//------------------------------------------------------------------
export const processFlowTime = (
  _ /*: Array<number> */,
  flwItem /*: FlwItem */,
) /*: Array<number> */ => {
  if (expdtIsOn() === false || flwItem.dExpedite === false) {
    _.push(flwItem.dAge);
  }
  return _;
};
//------------------------------------------------------------------
// updateThrouPutQueue()
//------------------------------------------------------------------
export const updateThroughPutQueue = (
  throughPutArray /*: Array<number> */,
) /*: void */ => {
  if (gState().get("thrPtQueue").length() >= gSttngs().get("timeBox")) {
    gState().get("thrPtQueue").dequeue();
  }
  gState().get("thrPtQueue").enqueue(throughPutArray);
};
//------------------------------------------------------------------
// updateFlowTimeQueue()
//------------------------------------------------------------------
export const updateFlowTimeQueue = (
  flwTimeArray /*: Array<number> */,
) /*: void */ => {
  if (gState().get("flwTmQueue").length() >= gSttngs().get("timeBox")) {
    gState().get("flwTmQueue").dequeue();
  }
  gState().get("flwTmQueue").enqueue(flwTimeArray);
};
