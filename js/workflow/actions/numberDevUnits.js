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
    (gSttngs().devUnits * gSttngs().expdtdDvUnitsFactor) / touchStepsCount(),
  );
};
//------------------------------------------------------------------
// numberNormalDevUnits()
//------------------------------------------------------------------
export const numberNormalDevUnits = () /*: number */ => {
  const nrmlDvUnitsFactor = 1 - gSttngs().expdtdDvUnitsFactor;
  // Return the number of normal dev units divided by the number of touch steps
  // as the number of normal dev units per touch step
  return Math.floor(
    (gSttngs().devUnits * nrmlDvUnitsFactor) / touchStepsCount(),
  );
};
