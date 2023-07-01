//@flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import expdtIsOn from "./expdtIsOn.js";
import updateExpdtQueues from "./updateExpdtQueues.js";
import updateNrmlQueues from "./updateNrmlQueues.js";
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
    if (expdtIsOn() === true) {
      updateExpdtQueues(doneFlwItems);
    }
    updateNrmlQueues(doneFlwItems, removeDoneFlwItmsFromFlwMap);
    // There is only one value queue
    updateValueQueue([...doneFlwItems].reduce(processValue, []));
    [...doneFlwItems].reduceRight(removeDoneFlwItmsFromFlwMap, null);
  };
//------------------------------------------------------------------
// processValue()
//------------------------------------------------------------------
export const processValue = (
  _ /*: Array<number> */,
  flwItem /*: FlwItem */,
) /*: Array<number> */ => {
  _.push(flwItem.dVolume);
  return _;
};
//------------------------------------------------------------------
// updateValueQueue()
//------------------------------------------------------------------
export const updateValueQueue = (
  valueArray /*: Array<number> */,
) /*: void */ => {
  if (gState().get("vQueue").length() >= gSttngs().get("timeBox")) {
    gState().get("vQueue").dequeue();
  }
  gState().get("vQueue").enqueue(valueArray);
};
