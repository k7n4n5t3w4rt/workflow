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
  console.log("[calculateNewPosition] flwItem:", flwItem);
  const range = calculateRange(flwItem.dStpIndex);
  console.log("[calculateNewPosition] range:", range);
  const newPosition = { ...flwItem.dPosition };
  console.log("[calculateNewPosition] newPosition (before):", newPosition);
  const steps = gSttngs().get("steps");
  console.log("[calculateNewPosition] steps:", steps);
  const nextStatus = steps[flwItem.dStpIndex]?.status;
  console.log("[calculateNewPosition] nextStatus:", nextStatus);

  if (nextStatus === "done") {
    const vSphere = gState().get("vSphere");
    const endPosition = gState().get("endPosition");
    console.log("[calculateNewPosition] vSphere:", vSphere);
    console.log("[calculateNewPosition] endPosition:", endPosition);
    newPosition.x = vSphere?.dPosition?.x;
    newPosition.y = vSphere?.dPosition?.y;
    newPosition.z = endPosition?.z;
    console.log("[calculateNewPosition] newPosition (done):", newPosition);
  } else {
    const strtPosition = gState().get("strtPosition");
    console.log("[calculateNewPosition] strtPosition:", strtPosition);
    console.log("[calculateNewPosition] strtPosition.x:", strtPosition?.x);
    console.log("[calculateNewPosition] strtPosition.y:", strtPosition?.y);
    console.log("[calculateNewPosition] range:", range);
    newPosition.x =
      strtPosition?.x +
      (Math.round(rndmPosOrNeg() * rndmBetween(0, range) * 100) / 100) *
        rndmPosOrNeg();
    newPosition.y =
      strtPosition?.y +
      (Math.round(rndmBetween(0, range) * 100) / 100) * rndmPosOrNeg();
    newPosition.z = calculateZPosFromStep(flwItem.dStpIndex);
    console.log("[calculateNewPosition] newPosition (not done):", newPosition);
  }
  console.log("[calculateNewPosition] newPosition (final):", newPosition);
  return newPosition;
};
