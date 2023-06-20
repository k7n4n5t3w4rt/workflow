// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// dragFunction()
//------------------------------------------------------------------
export default (devDays /*: number */, wip /*: number */) /*: number */ => {
  if (wip <= 0 || devDays <= 0) {
    return 0;
  }
  // We actually want the inverse of drag, so we subtract it from 1.
  // Also has the benefit of handling drag = 0.
  const dragFactor = 1 - gSttngs().drag;
  // The Math.round() is to avoid floating point errors.
  // NOTE: If there are more devDays available than wip, then we can pair
  // up or otherwise collaborate on the work, so we return more than 1.
  // So this function should still work.
  return Math.round((devDays / wip) * dragFactor * 100) / 100;
};
