// @flow
//------------------------------------------------------------------
// findRadius()
//------------------------------------------------------------------
export default (volume /*: number */) /*: number */ => {
  if (volume <= 0) {
    return 0;
  }
  const pi = Math.PI;
  let radius = Math.cbrt((3 * volume) / (4 * pi));
  return Math.round(radius * 100) / 100;
};
