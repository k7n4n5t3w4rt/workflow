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
// calculateDevPowerFactor()
//------------------------------------------------------------------
// This is the "Logarithmic using Curve Fitting" option from:
//  https://www.dcode.fr/function-equation-finder
// for the following data points:
//  (1, 1.2)
//  (2, 1)
//  (10, 0.8)
const calculateDevPowerFactor = (
  wip /*: number */,
  devUnits /*: number */,
) /*: number */ => {
  if (devUnits > wip) {
    return 1;
  }
  const x = wip / devUnits;
  // the constants in the function
  const a = 1.8391;
  const b = 0.115564;
  const c = 925.738;
  const d = 648.357;
  // calculate y based on the given formula
  const y = a - b * Math.log(c * x - d);

  return Math.round(y * 10) / 10;
};
export default calculateDevPowerFactor;
//------------------------------------------------------------------------------
// TESTS
//------------------------------------------------------------------------------
// const fixture = () => {};
// test("------- calculateDevPowerFactor.js -------", () /*: void */ => {
//   should(1).be.exactly(1);
// });
// test("ratio = 1:1, devPowerFactor === 1.2", () /*: void */ => {
//   should(calculateDevPowerFactor(1, 1)).be.exactly(1.2);
// });
// test("ratio = 2:1, devPowerFactor === 1", () /*: void */ => {
//   should(calculateDevPowerFactor(2, 1)).be.exactly(1);
// });
// test("ratio = 3:1, devPowerFactor === 1", () /*: void */ => {
//   should(calculateDevPowerFactor(3, 1)).be.exactly(1);
// });
// test("ratio = 4:1, devPowerFactor === 0.9", () /*: void */ => {
//   should(calculateDevPowerFactor(4, 1)).be.exactly(0.9);
// });
// test("ratio = 10:1, devPowerFactor === 0.8", () /*: void */ => {
//   should(calculateDevPowerFactor(10, 1)).be.exactly(0.8);
// });
