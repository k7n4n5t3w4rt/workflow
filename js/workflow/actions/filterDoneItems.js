//@flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import newFlwItem from "./newFlwItem.js";

//------------------------------------------------------------------
// filterDoneItems()
//------------------------------------------------------------------
export default (
    removeDoneFlwItmsFromFlwMap /*: (_:null|void, flwItem:FlwItem, index:number) => void */,
  ) /*: () => void */ =>
  () /*: void */ => {
    gState().vSphere.dRllngTtlVolume = 0;
    const doneFlwItems =
      gState().flwMap[(gSttngs().steps.length - 1).toString()];
    if (doneFlwItems.length > 0) {
      updateThroughPutExpQueue(
        [...doneFlwItems].reduce(processThroughPutExp, [0]),
      );
      updateThroughPutQueue([...doneFlwItems].reduce(processThroughPut, [0]));
      // Value is based on the volume of the doneFlwItems
      updateValueQueue([...doneFlwItems].reduce(processValue, []));
      // Flow Time is based on age of the doneFlwItems
      updateFlowTimeExpQueue([...doneFlwItems].reduce(processFlowTimeExp, []));
      updateFlowTimeQueue([...doneFlwItems].reduce(processFlowTime, []));
      [...doneFlwItems].reduceRight(removeDoneFlwItmsFromFlwMap, null);
    } else {
      updateValueQueue([0]);
      updateThroughPutQueue([0]);
      updateFlowTimeQueue([0]);
    }
  };
//------------------------------------------------------------------
// processThroughPut()
//------------------------------------------------------------------
const processThroughPut = (
  _ /*: Array<number> */,
  flwItem /*: FlwItem */,
) /*: Array<number> */ => {
  if (flwItem.dExpedite === false) {
    _[0] += 1;
  }
  return _;
};
//------------------------------------------------------------------
// processThroughPutExp()
//------------------------------------------------------------------
const processThroughPutExp = (
  _ /*: Array<number> */,
  flwItem /*: FlwItem */,
) /*: Array<number> */ => {
  if (flwItem.dExpedite === true) {
    _[0] += 1;
  }
  return _;
};
//------------------------------------------------------------------
// processFlowTime()
//------------------------------------------------------------------
const processFlowTime = (
  _ /*: Array<number> */,
  flwItem /*: FlwItem */,
) /*: Array<number> */ => {
  if (flwItem.dExpedite === false) {
    _.push(flwItem.dAge);
  }
  return _;
};
//------------------------------------------------------------------
// processFlowTimeExp()
//------------------------------------------------------------------
const processFlowTimeExp = (
  _ /*: Array<number> */,
  flwItem /*: FlwItem */,
) /*: Array<number> */ => {
  if (flwItem.dExpedite === true) {
    _.push(flwItem.dAge);
  }
  return _;
};
//------------------------------------------------------------------
// processValue()
//------------------------------------------------------------------
const processValue = (
  _ /*: Array<number> */,
  flwItem /*: FlwItem */,
) /*: Array<number> */ => {
  _.push(flwItem.dVolume);
  return _;
};

//------------------------------------------------------------------
// updateValueQueue()
//------------------------------------------------------------------
const updateValueQueue = (valueArray /*: Array<number> */) /*: void */ => {
  if (gState().vQueue.length() >= gSttngs().timeBox) {
    gState().vQueue.dequeue();
  }
  gState().vQueue.enqueue(valueArray);
};

//------------------------------------------------------------------
// updateThrouPutQueue()
//------------------------------------------------------------------
const updateThroughPutQueue = (
  throughPutArray /*: Array<number> */,
) /*: void */ => {
  if (gState().thrPtQueue.length() >= gSttngs().timeBox) {
    gState().thrPtQueue.dequeue();
  }
  gState().thrPtQueue.enqueue(throughPutArray);
};

//------------------------------------------------------------------
// updateThrouPutExpQueue()
//------------------------------------------------------------------
const updateThroughPutExpQueue = (
  throughPutExpArray /*: Array<number> */,
) /*: void */ => {
  if (gState().thrPtExpQueue.length() >= gSttngs().timeBox) {
    gState().thrPtExpQueue.dequeue();
  }
  gState().thrPtExpQueue.enqueue(throughPutExpArray);
};
//------------------------------------------------------------------
// updateFlowTimeExpQueue()
//------------------------------------------------------------------
const updateFlowTimeExpQueue = (
  flwTimeArray /*: Array<number> */,
) /*: void */ => {
  if (gState().flwTmExpQueue.length() >= gSttngs().timeBox) {
    gState().flwTmExpQueue.dequeue();
  }
  gState().flwTmExpQueue.enqueue(flwTimeArray);
};
//------------------------------------------------------------------
// updateFlowTimeQueue()
//------------------------------------------------------------------
const updateFlowTimeQueue = (flwTimeArray /*: Array<number> */) /*: void */ => {
  if (gState().flwTmQueue.length() >= gSttngs().timeBox) {
    gState().flwTmQueue.dequeue();
  }
  gState().flwTmQueue.enqueue(flwTimeArray);
};
