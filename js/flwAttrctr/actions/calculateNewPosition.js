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
  const range = calculateRange(flwItem.dStpIndex);
  const newPosition = { ...flwItem.dPosition };
  const nextStatus = gSttngs().get("steps")[flwItem.dStpIndex].status;

  if (nextStatus === "done") {
    newPosition.x = gState().get("vSphere").dPosition.x;
    newPosition.y = gState().get("vSphere").dPosition.y;
    newPosition.z = gState().get("endPosition").z;
  } else {
    newPosition.x =
      gState().get("strtPosition").x +
      (Math.round(rndmPosOrNeg() * rndmBetween(0, range) * 100) / 100) *
        rndmPosOrNeg();
    newPosition.y =
      gState().get("strtPosition").y +
      (Math.round(rndmBetween(0, range) * 100) / 100) * rndmPosOrNeg();
    newPosition.z = calculateZPosFromStep(flwItem.dStpIndex);
  }
  return newPosition;
};
