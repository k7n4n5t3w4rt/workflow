// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------------------
// TESTY
//------------------------------------------------------------------------------
// import { test, testPromise, should } from "../../../server/testy.js";
//------------------------------------------------------------------
// calculateValueForScale()
//------------------------------------------------------------------
const calculateValueForScale = (
  xMax /*: number */,
  xLimit /*: number */,
) /*: number */ => {
  // Three x values:
  //   |
  //   |                .
  // y |         .
  //   |  .
  //   |_ _ _ _ __ _ _ __ _ _ _
  //     x20     x      x100
  // const xLimit = xMax * xLimitFactor;
  const paretoPoint = gSttngs().get("paretoPoint");
  // If the paretoPoint is 0.2, y will be 0.8 when x is 0.2, i.e.:
  //  k = log(0.8) / log(0.2) = 0.1386;
  // const k = 0.1386;
  const k = Math.log(0.8) / Math.log(paretoPoint);
  const y = Math.round(xMax * Math.pow(xLimit / xMax, k) * 100) / 100;
  return y; // Scale the y value to the same range as x
};

export default calculateValueForScale;
//------------------------------------------------------------------------------
// TESTS
//------------------------------------------------------------------------------
// const fixture = () => {};
// test("------- calculateValueForScale.js -------", () /*: void */ => {
//   should(1).be.exactly(1);
// });
// test("Return the correct scaled value according to the 80/20 rule", () /*: void */ => {
//   should(calculateValueForScale(1, 0.2)).be.exactly(0.8);
//   should(calculateValueForScale(1, 0.3)).be.exactly(0.85);
//   should(calculateValueForScale(1, 0.4)).be.exactly(0.88);
//   should(calculateValueForScale(1, 0.5)).be.exactly(0.91);
//   should(calculateValueForScale(1, 0.6)).be.exactly(0.93);
//   should(calculateValueForScale(1, 0.7)).be.exactly(0.95);
//   should(calculateValueForScale(1, 0.8)).be.exactly(0.97);
//   should(calculateValueForScale(1, 0.9)).be.exactly(0.99);
//   should(calculateValueForScale(1, 1)).be.exactly(1);
//   should(calculateValueForScale(2, 0.4)).be.exactly(1.6);
// });
