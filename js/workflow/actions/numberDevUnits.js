// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import touchStepsCount from "./touchStepsCount.js";
//------------------------------------------------------------------
// numberExpiditedDevUnits()
//------------------------------------------------------------------
export const numberExpiditedDevUnits = () /*: number */ => {
  if (
    gSttngs().get("expdtdDvUnitsFactor") === 0 ||
    gSttngs().get("expdtQueueLength") === 0
  ) {
    return 0;
  }
  // Return the number of expedited dev units divided by the number of touch steps
  // as the number of expedited dev units per touch step
  return (
    Math.round(
      ((gSttngs().get("devUnits") * gSttngs().get("expdtdDvUnitsFactor")) /
        touchStepsCount()) *
        100,
    ) / 100
  );
};
//------------------------------------------------------------------
// numberNormalDevUnits()
//------------------------------------------------------------------
export const numberNormalDevUnits = () /*: number */ => {
  // There are always going to be some normal dev units sitting
  // in the flwMap, so we need to only allocate resources if there are
  // some speciically allocated to normal work
  if (
    gSttngs().get("expdtdDvUnitsFactor") === 0 ||
    gSttngs().get("expdtQueueLength") === 0
  ) {
    return (
      Math.round((gSttngs().get("devUnits") / touchStepsCount()) * 100) / 100
    );
  }
  const nrmlDvUnitsFactor = 1 - gSttngs().get("expdtdDvUnitsFactor");
  // Return the number of normal dev units divided by the number of touch steps
  // as the number of normal dev units per touch step
  return (
    Math.round(
      ((gSttngs().get("devUnits") * nrmlDvUnitsFactor) / touchStepsCount()) *
        100,
    ) / 100
  );
};
