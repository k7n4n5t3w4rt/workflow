//@flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import removeFlowItem from "./removeFlowItem.js";

//------------------------------------------------------------------
// filterDoneItems()
//------------------------------------------------------------------
export default () => {
  gState().vSphere.dRllngTtlVolume = 0;
  const doneFlwItems =
    gState().flwMap[(gSttngs().flwSteps.length - 1).toString()];
  if (doneFlwItems.length > 0) {
    // Throughput is easy, we just count the number of items in the doneFlwItems
    updateThroughPutQueue(doneFlwItems.length);
    // Value is based on the volume of the doneFlwItems
    const valueFlwItems = [...doneFlwItems];
    updateValueQueue(valueFlwItems.reduce(processValueFlwItems, 0));
    // Flow Time is based on age of the doneFlwItems
    const flowTimeQueueFlwItems = [...doneFlwItems];
    updateFlowTimeQueue(
      flowTimeQueueFlwItems.reduce(processFlowTimeFlwItems, []),
    );

    doneFlwItems.forEach(removeFlowItem);
    console.log("doneFlwItems", doneFlwItems);
  } else {
    updateValueQueue(0);
    updateThroughPutQueue(0);
  }
};
//------------------------------------------------------------------
// processFlowTimeFlwItems()
//------------------------------------------------------------------
const processFlowTimeFlwItems = (
  accumulator /*: Array<number> */,
  flwItem /*: FlwItem */,
) => {
  accumulator.push(flwItem.dAge);
  return accumulator;
};
//------------------------------------------------------------------
// processValueFlwItems()
//------------------------------------------------------------------
const processValueFlwItems = (
  accumulator /*: number */,
  flwItem /*: FlwItem */,
) => {
  return accumulator + flwItem.dVolume;
};

// //------------------------------------------------------------------
// // processDoneFlwItems()
// //------------------------------------------------------------------
// const processDoneFlwItems = (flwItem /*: FlwItem */, index /*: number */) => {
//   // theActualMeshObject may be undefined if it has already been removed
//   let theActualMeshObject = gState().scnData.scene.getObjectByName(
//     flwItem.name,
//   );
//   if (theActualMeshObject !== undefined) {
//     // Remove the mesh object from the scene
//     removeThreeObject(theActualMeshObject);
//     // Remove it from the flwMap
//     const deletedFlwItem = gState().flwMap[
//       flwItem.dFlwStpsIndex.toString()
//     ].splice(index, 1);
//   }
// };

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
