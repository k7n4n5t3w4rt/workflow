//@flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------

//------------------------------------------------------------------
// filterDoneItems()
//------------------------------------------------------------------
export default (
    removeFlowItem /*: (flwItem:FlwItem, index:number) => void */,
  ) /*: () => void */ =>
  () /*: void */ => {
    gState().vSphere.dRllngTtlVolume = 0;
    const doneFlwItems =
      gState().flwMap[(gSttngs().steps.length - 1).toString()];
    if (doneFlwItems.length > 0) {
      // Throughput is easy, we just count the number of items in the doneFlwItems
      updateThroughPutQueue(doneFlwItems.length);
      // Value is based on the volume of the doneFlwItems
      updateValueQueue([...doneFlwItems].reduce(processValue, 0));
      // Flow Time is based on age of the doneFlwItems
      updateFlowTimeQueue([...doneFlwItems].reduce(processFlowTime, []));
      doneFlwItems.forEach(removeFlowItem);
    } else {
      updateValueQueue(0);
      updateThroughPutQueue(0);
    }
  };
//------------------------------------------------------------------
// processFlowTime()
//------------------------------------------------------------------
const processFlowTime = (
  _ /*: Array<number> */,
  flwItem /*: FlwItem */,
) /*: Array<number> */ => {
  _.push(flwItem.dAge);
  return _;
};
//------------------------------------------------------------------
// processValue()
//------------------------------------------------------------------
const processValue = (
  _ /*: number */,
  flwItem /*: FlwItem */,
) /*: number */ => {
  return _ + flwItem.dVolume;
};

//------------------------------------------------------------------
// updateValueQueue()
//------------------------------------------------------------------
const updateValueQueue = (flwItemValue /*: number */) /*: void */ => {
  if (gState().vQueue.length() >= gSttngs().timeBox) {
    gState().vQueue.dequeue();
  }
  gState().vQueue.enqueue(flwItemValue);
};

//------------------------------------------------------------------
// updateThrouPutQueue()
//------------------------------------------------------------------
const updateThroughPutQueue = (throughPut /*: number */) /*: void */ => {
  if (gState().thrPtQueue.length() >= gSttngs().timeBox) {
    gState().thrPtQueue.dequeue();
  }
  gState().thrPtQueue.enqueue(throughPut);
};

//------------------------------------------------------------------
// updateFlowTimeQueue()
//------------------------------------------------------------------
const updateFlowTimeQueue = (flwTimes /*: Array<number> */) /*: void */ => {
  flwTimes.forEach((flwTime /*: number */) /*: void */ => {
    if (gState().flwTmQueue.length() >= 35) {
      gState().flwTmQueue.dequeue();
    }
    gState().flwTmQueue.enqueue(flwTime);
  });
};
