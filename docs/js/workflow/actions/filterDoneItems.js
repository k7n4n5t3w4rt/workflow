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
    gState().get("vSphere").dRllngTtlVolume = 0;
    const doneFlwItems =
      gState().get("flwMap")[(gSttngs().get("steps").length - 1).toString()];
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
  if (gState().get("vQueue").length() >= gSttngs().get("timeBox")) {
    gState().get("vQueue").dequeue();
  }
  gState().get("vQueue").enqueue(valueArray);
};

//------------------------------------------------------------------
// updateThrouPutQueue()
//------------------------------------------------------------------
const updateThroughPutQueue = (
  throughPutArray /*: Array<number> */,
) /*: void */ => {
  if (gState().get("thrPtQueue").length() >= gSttngs().get("timeBox")) {
    gState().get("thrPtQueue").dequeue();
  }
  gState().get("thrPtQueue").enqueue(throughPutArray);
};

//------------------------------------------------------------------
// updateThrouPutExpQueue()
//------------------------------------------------------------------
const updateThroughPutExpQueue = (
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
const updateFlowTimeExpQueue = (
  flwTimeArray /*: Array<number> */,
) /*: void */ => {
  if (gState().get("flwTmExpQueue").length() >= gSttngs().get("timeBox")) {
    gState().get("flwTmExpQueue").dequeue();
  }
  gState().get("flwTmExpQueue").enqueue(flwTimeArray);
};
//------------------------------------------------------------------
// updateFlowTimeQueue()
//------------------------------------------------------------------
const updateFlowTimeQueue = (flwTimeArray /*: Array<number> */) /*: void */ => {
  if (gState().get("flwTmQueue").length() >= gSttngs().get("timeBox")) {
    gState().get("flwTmQueue").dequeue();
  }
  gState().get("flwTmQueue").enqueue(flwTimeArray);
};
