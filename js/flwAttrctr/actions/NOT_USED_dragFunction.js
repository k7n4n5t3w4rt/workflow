// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs";
//------------------------------------------------------------------
// dragFunction()
//------------------------------------------------------------------
export default (devDays /*: number */, wip /*: number */) /*: number */ => {
  if (wip <= 0 || devDays <= 0) {
    return 0;
  }
  // If there are more devDays available than wip, return 1
  if (devDays > wip) {
    return 1;
  }
  // We actually want the inverse of drag, so we subtract it from 1.
  // Also has the benefit of handling drag = 0.
  const dragFactor = 1 - gSttngs().get("drag");
  // The Math.round() is to avoid floating point errors.
  return (
    Math.round(((devDays + (wip - devDays) / 1.05) / wip) * dragFactor * 100) /
    100
  );
};
