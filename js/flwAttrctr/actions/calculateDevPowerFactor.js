// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------------------
// TESTY
//------------------------------------------------------------------------------
// import { test, testPromise, should } from "../server/testy.js";
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
  // console.log(
  //   `calculateDevPowerFactor(): devUnits: ${devUnits}, wip: ${wip}, devRatio: ${devRatio}, devPowerFactor: ${devPowerFactor}`,
  // );
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
  if (dragPoint <= 0) {
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
  // console.log(
  //   `calculateDevPowerForDevToWipRatio(): devUnitsToWipRatio: ${devUnitsToWipRatio}, drag: ${drag}, dragPoint: ${dragPoint}, k: ${k}, y: ${y}`,
  // );
  return y; // Scale the y value to the same range as x
};
export default calculateDevPowerFactor;
