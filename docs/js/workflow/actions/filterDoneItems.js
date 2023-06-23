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
      // Throughput is easy, we just count the number of items in the doneFlwItems
      updateThroughPutQueue([doneFlwItems.length]);
      // // TEMP - for a stable system, we need to add a new item for each doneFlwItem
      // for (let i = 0; i <= doneFlwItems.length; i++) {
      //   newFlwItem();
      // }
      // Value is based on the volume of the doneFlwItems
      updateValueQueue([...doneFlwItems].reduce(processValue, []));
      // Flow Time is based on age of the doneFlwItems
      updateFlowTimeQueue([...doneFlwItems].reduce(processFlowTime, []));
      [...doneFlwItems].reduceRight(removeDoneFlwItmsFromFlwMap, null);
    } else {
      updateValueQueue([0]);
      updateThroughPutQueue([0]);
      updateFlowTimeQueue([0]);
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
  console.log("valueArray: ", valueArray);
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
  console.log("throughPutArray: ", throughPutArray);
  gState().thrPtQueue.enqueue(throughPutArray);
};

//------------------------------------------------------------------
// updateFlowTimeQueue()
//------------------------------------------------------------------
const updateFlowTimeQueue = (flwTimeArray /*: Array<number> */) /*: void */ => {
  if (gState().flwTmQueue.length() >= gSttngs().timeBox) {
    gState().flwTmQueue.dequeue();
  }
  console.log("flwTimeArray: ", flwTimeArray);
  gState().flwTmQueue.enqueue(flwTimeArray);
};
