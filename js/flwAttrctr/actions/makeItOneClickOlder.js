// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import StepName from "../Settings/StepName";
import gSttngs from "./gSttngs.js";

//------------------------------------------------------------------
// makeItOneClickOlder()
//------------------------------------------------------------------
export default (flwItem /*: FlwItem */) /*: FlwItem */ => {
  let dStpIndex = flwItem.dStpIndex;
  if (dStpIndex > gSttngs().get("steps").length - 1) {
    dStpIndex = gSttngs().get("steps").length - 1;
    flwItem.dStpIndex = dStpIndex;
  }
  flwItem.dStepsAges[dStpIndex.toString()] += 1;
  // Only increment if the step is not "Done"
  // This is to prevent the age from increasing in the Done step
  const isDoneStep = gSttngs().get("steps")[dStpIndex].status === "done";
  if (dStpIndex !== 0 && !isDoneStep) {
    flwItem.dAge += 1;
    // console.log(
    //   `makeItOneClickOlder: ${dStpIndex} - Incrementing age of item ${flwItem.name} to ${flwItem.dAge}`,
    // );
  }
  return flwItem;
};
