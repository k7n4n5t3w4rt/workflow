// @flow
//------------------------------------------------------------------
// dragFunction()
//------------------------------------------------------------------

export default (
  devDays /*: number */,
  wip /*: number */,
  drag /*: number */,
) /*: number */ => {
  if (wip <= 0 || devDays <= 0) {
    return 0;
  }
  if (wip <= devDays) {
    return 1;
  }
  // We actually want the inverse of drag, so we subtract it from 1.
  // Also has the benefit of handling drag = 0.
  const dragFactor = 1 - drag;
  // The Math.round() is to avoid floating point errors.
  return Math.round((devDays / wip) * dragFactor * 100) / 100;
};
