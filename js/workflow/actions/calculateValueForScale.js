// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------------------
// TESTY
//------------------------------------------------------------------------------
import { test, testPromise, should } from "../../../server/testy.js";
//------------------------------------------------------------------
// calculateValueForScale()
//------------------------------------------------------------------
const calculateValueForScale = (
  scale /*: number */,
  flwItmSizeLimit /*: number */,
) /*: number */ => {
  if (scale < flwItmSizeLimit) {
    return scale;
  }
  // The difference in y (1 - 0.8) divided by the difference in x (1 - 0.2):
  // === 0.25
  const slope = Math.round(((1 - 0.8) / (1 - 0.2)) * 100) / 100;
  // When x is 0.2, y is 0.8. So:
  // y = slope * x + intercept ->
  // intercept = y - slope * x ->
  // intercept = 0.8 - 0.25 * 0.2 ->
  // intercept = 0.75
  const intercept = 0.8 - slope * 0.2;
  return slope * scale + intercept;
};

export default calculateValueForScale;
//------------------------------------------------------------------------------
// TESTS
//------------------------------------------------------------------------------
const fixture = () => {};
test("------- calculateValueForScale.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});
test("Return the correct scaled value according to the 80/20 rule", () /*: void */ => {
  should(calculateValueForScale(1, 0.2)).be.exactly(1);
  should(calculateValueForScale(0.2, 0.2)).be.exactly(0.8);
  should(calculateValueForScale(0.6, 0.2)).be.exactly(0.9);
  //   should(calculateValueForScale(1, 0.3)).be.exactly(0.8);
  //  should(calculateValueForScale(1, 0.9)).be.exactly(1);
});
// test("scale = .20, return value === 0.8", () /*: void */ => {
//   should(calculateValueForScale(0.2)).be.exactly(0.8);
// });
// test("scale = 1, return value === 1", () /*: void */ => {
//   should(calculateValueForScale(1)).be.exactly(1);
// });
// test("scale = .40, return value === 0.85", () /*: void */ => {
//   should(calculateValueForScale(0.4)).be.exactly(0.85);
// });
// test("scale = .55, return value === 0.8875", () /*: void */ => {
//   should(calculateValueForScale(0.55)).be.exactly(0.8875);
// });
