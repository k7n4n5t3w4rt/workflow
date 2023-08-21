// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
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
  if (devUnits >= wip) {
    return 1;
  }
  const devRatio = devUnits / wip;
  const devPowerFactor = calculateDevPowerForDevToWipRatio(devRatio);
  return devPowerFactor;
};
//------------------------------------------------------------------------------
// calculateDevPowerForDevToWipRatio()
//------------------------------------------------------------------------------
const calculateDevPowerForDevToWipRatio = (
  devUnitsToWipRatio /*: number */,
) /*: number */ => {
  // Make 1:1 the maximally effective ratio
  if (devUnitsToWipRatio > 1) {
    return 1;
  }
  const drag = gSttngs().get("drag");
  if (drag <= 0) {
    return 1;
  }
  const dragPoint = gSttngs().get("dragPoint");
  if (drag <= 0) {
    return 1;
  }
  // Three x values:
  //   |
  //   |                .
  // y |         .
  //   |  .
  //   |_ _ _ _ __ _ _ __ _ _ _
  //     x20     x      x100
  // If drag is 0.2, y will be 0.8 when x is 0.5, i.e. when the ratio of dev units to
  // WIP is 1:2.
  // k = log(0.8) / log(0.5) = 0.3219;
  const k = Math.log(1 - drag) / Math.log(0.5);
  const y = Math.round(Math.pow(devUnitsToWipRatio, k) * 100) / 100;
  return y; // Scale the y value to the same range as x
};
export default calculateDevPowerFactor;
//------------------------------------------------------------------------------
// TESTS
//------------------------------------------------------------------------------
// test("------- calculateDevPowerFactor.js -------", () /*: void */ => {
//   should(1).be.exactly(1);
// });
// test("Return devPower according to the power law", () /*: void */ => {
//   gSttngs().set("drag", 0.2);
//   should(calculateDevPowerFactor(10, 10)).be.exactly(1);
//   should(calculateDevPowerFactor(10, 9)).be.exactly(0.97);
//   should(calculateDevPowerFactor(10, 8)).be.exactly(0.93);
//   should(calculateDevPowerFactor(10, 7)).be.exactly(0.89);
//   should(calculateDevPowerFactor(10, 6)).be.exactly(0.85);
//   should(calculateDevPowerFactor(10, 5)).be.exactly(0.8);
//   should(calculateDevPowerFactor(10, 4)).be.exactly(0.74);
//   should(calculateDevPowerFactor(10, 3)).be.exactly(0.68);
//   should(calculateDevPowerFactor(10, 2)).be.exactly(0.6);
//   should(calculateDevPowerFactor(10, 1)).be.exactly(0.48);
// });
