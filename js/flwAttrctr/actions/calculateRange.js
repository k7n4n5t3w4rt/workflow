// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs";
import gState from "./gState";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------

//------------------------------------------------------------------
// calculateRange()
//------------------------------------------------------------------
export default (x /*: number */) /*: number */ => {
  const max =
    gSttngs().get("rangeMax") *
    (gSttngs().get("scale") * gSttngs().get("flwItmSizeLimit")); // the maximum value that y approaches
  const x0 = gSttngs().get("rangeMidpoint"); // the x-value of the sigmoid's midpoint
  const k = gSttngs().get("rangeIncreaseRate"); // the logistic growth rate or steepness of the curve

  return max / (1 + Math.exp(-k * (x - x0)));
};
