//@flow

export default (volume /*: number */) /*: number */ => {
  const newSphereRadius = Math.cbrt(volume / ((4 / 3) * Math.PI));
  return newSphereRadius;
};
