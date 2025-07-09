// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs";
//------------------------------------------------------------------------------
// TESTY
//------------------------------------------------------------------------------
// import { test, testPromise, should } from "../server/testy";
//------------------------------------------------------------------
// calculateValueForScale()
//------------------------------------------------------------------
const calculateValueForScale = (
  x100 /*: number */,
  xLimit /*: number */,
) /*: number */ => {
  // Three x values:
  //   |
  //   |                .
  // y |         .
  //   |  .
  //   |_ _ _ _ __ _ _ __ _ _ _
  //     x20   xLimit  x100
  // x100 = `scale`, e.g. 1
  // xLimit = `flwItmSizeLimit`. It will be > 0.2, < 1
  // x20 = 0.2 * x100 - i.e. 20% of x100 (for the 80/20 rule)
  const x20 = 0.2 * x100;
  // If the flwItem size, `scale`, is already smaller than `flwItemSizeLimit`,
  // return it untouched as the y value. For now, the x and y scales are the same,
  // so the x (size) of x100 is also its y100(value):
  if (x100 <= xLimit) {
    return x100;
  }
  // The difference in y (1 - 0.8) / the difference in x (1 - 0.2):
  // === 0.25
  const slope = 0.25;
  // Calculate the intercept, whcih is where the slope crosses the y axis.
  // We treat x100 as 100% and y20 will be 80% of that.
  // If x20 is 0.2, y20 is 0.8.
  // If x100 is 1, y100is 1.
  // So:
  // y20 = slope * x20 + intercept ->
  // intercept = y20 - slope * x20 ->
  // intercept = 0.8 - 0.25 * 0.2 ->
  // intercept = 0.75
  const intercept = 0.8 * x100 - slope * (0.2 * x100);
  // We want to know yLimit, the y value for xLimit
  return Math.round((slope * xLimit + intercept) * 100) / 100;
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
//   should(calculateValueForScale(1, 1)).be.exactly(1);
//   // should(calculateValueForScale(0.6, 0.2)).be.exactly(0.4);
//   // should(calculateValueForScale(0.21, 0.2)).be.below(0.21);
//   // should(calculateValueForScale(0.21, 0.2)).be.above(0.2);
// });
