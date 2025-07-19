// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import calculateRange from "./calculateRange.js";
import rndmPosOrNeg from "./rndmPosOrNeg.js";
import rndmBetween from "./rndmBetweenWhatever.js";
import calculateZPosFromStep from "./calculateZPosFromStep.js";

//------------------------------------------------------------------
// calculateNewPosition()
//------------------------------------------------------------------
export default (flwItem /*: FlwItem */) /*: ThrMeshPosition */ => {
  // console.log("[calculateNewPosition] flwItem:", flwItem);
  const range = calculateRange(flwItem.dStpIndex);
  const newPosition = { ...flwItem.dPosition };
  const steps = gSttngs().get("steps");
  const nextStatus = steps[flwItem.dStpIndex]?.status;

  if (nextStatus === "done") {
    const vSphere = gState().get("vSphere");
    const endPosition = gState().get("endPosition");
    newPosition.x = vSphere?.dPosition?.x;
    newPosition.y = vSphere?.dPosition?.y;
    newPosition.z = endPosition?.z;
  } else {
    const strtPosition = gState().get("strtPosition");
    newPosition.x =
      strtPosition?.x +
      (Math.round(rndmPosOrNeg() * rndmBetween(0, range) * 100) / 100) *
        rndmPosOrNeg();
    newPosition.y =
      strtPosition?.y +
      (Math.round(rndmBetween(0, range) * 100) / 100) * rndmPosOrNeg();
    newPosition.z = calculateZPosFromStep(flwItem.dStpIndex);
  }
  return newPosition;
};
