// @flow
//------------------------------------------------------------------
// round2Places()
//------------------------------------------------------------------
export default (value /*: number */) /*: number */ => {
  return Math.round(value * 100) / 100;
};