// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// Fi
//------------------------------------------------------------------

//------------------------------------------------------------------
// calculateDrag()
//------------------------------------------------------------------
export default (wip /*: number */) /*: number */ => {
  if (wip === 0) return 1;
  if (wip === 1) return 1;
  wip += wip * gSttngs().get("drag"); // add the drag factor
  const max = 1; // the maximum value that y approaches
  // The wip-value of the sigmoid's midpoint
  let wip0 = 2; // i.e. the wip at which drag is 0.5
  let k = 1; // the logistic growth rate or steepness of the curve

  return 1 - max / (1 + Math.exp(-k * (wip - wip0)));
};
