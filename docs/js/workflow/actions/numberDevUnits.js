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
  // Return the number of expedited dev units divided by the number of touch steps
  // as the number of expedited dev units per touch step
  return Math.floor(
    (gSttngs().get("devUnits") * gSttngs().get("expdtdDvUnitsFactor")) /
      touchStepsCount(),
  );
};
//------------------------------------------------------------------
// numberNormalDevUnits()
//------------------------------------------------------------------
export const numberNormalDevUnits = () /*: number */ => {
  // Let's assume that all the dev units are normal dev units
  // because by the time we if we're working on normal flwItems,
  // there are no expedited flwItems left
  const nrmlDvUnitsFactor = 1;
  // const nrmlDvUnitsFactor = 1 - gSttngs().get("expdtdDvUnitsFactor");
  // Return the number of normal dev units divided by the number of touch steps
  // as the number of normal dev units per touch step
  return Math.floor(
    (gSttngs().get("devUnits") * nrmlDvUnitsFactor) / touchStepsCount(),
  );
};
