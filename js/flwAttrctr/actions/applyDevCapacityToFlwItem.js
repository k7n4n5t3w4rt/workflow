// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import expdtIsOn from "./expdtIsOn.js";
import calculateDevPower from "./calculateDevPower.js";
import calculateDevPowerFactor from "./calculateDevPowerFactor.js";
import calculateFlwTimeAtStart from "./calculateFlwTimeAtStart.js";
import calculateTouchSteps from "./calculateTouchSteps.js";
import stepWip from "./stepWip.js";
//------------------------------------------------------------------
// FUNCTION: applyDevCapacityToFlwItem()
//------------------------------------------------------------------
export const applyDevCapacityToFlwItem =
  (
    expediteFlag /*: boolean */,
    spareDevDays /*: SpareDevDays */,
    usingSpareDevDays /*: boolean */,
  ) /*: (flwItem:FlwItem) => void */ =>
  (flwItem /*: FlwItem */) /*: void */ => {
    const steps = gSttngs().get("steps");
    const expdtDvUnitsFactor = gSttngs().get("expdtDvUnitsFactor");
    let dStpIndex = flwItem.dStpIndex;
    // A bit of a hacky fix. The `dStpIndex` should never be out of range
    // but if it is, set it to the last step.
    if (dStpIndex > steps.length - 1) {
      dStpIndex = steps.length - 1;
      flwItem.dStpIndex = dStpIndex;
    }
    // If this flow item is not in a "touch" step, we're done.
    if (steps[dStpIndex].status !== "touch") {
      return;
    }
    // Set a default value for devDays.
    let devDays = 0;
    // If this is not a loop to use up spare capacity, then we need to calculate the devDays
    if (usingSpareDevDays === false) {
      // First, work out how many flow items are in the step.
      const wipThisStep = stepWip(dStpIndex.toString(), flwItem.dExpedite);
      // The current number of dev units for this step. `movingDevUnits`
      // may be 0, so I'm explicitly making that an option as a reminder.
      let devUnits = steps[dStpIndex].movingDevUnits || 0;
      // If there are no dev units, or no dev capacity, we're done.
      if (devUnits <= 0 || wipThisStep <= 0) {
        return;
      }
      // If expedite is on, multiply the dev units by the expedite factor
      // to get the number of dev units allocated to expedited flow items.
      if (expdtIsOn() === true && expediteFlag === true) {
        devUnits = devUnits * expdtDvUnitsFactor;
      }
      // The ratio of flow time at start for this step to the total flow time at start.
      const idealStepFlwTime = steps[dStpIndex].flwTimeAtStart;
      const actualStepFlwTime = steps[dStpIndex].actualFlwTime;
      const totalFlwTime = calculateFlwTimeAtStart();
      const avrgFlwTimePerStep = totalFlwTime / calculateTouchSteps();
      const flwTimeRatio = actualStepFlwTime / idealStepFlwTime;
      const devPower = calculateDevPower() / flwTimeRatio;
      const devPowerFactor = calculateDevPowerFactor(wipThisStep, devUnits);
      devDays = (devUnits * (devPower * devPowerFactor)) / wipThisStep;
    }
    // Reduce the days remaining by the number of days calculated above.
    updateDaysAndStoreSpareCapacity(flwItem, devDays, spareDevDays, dStpIndex);
  };
export default applyDevCapacityToFlwItem;

const updateDaysAndStoreSpareCapacity = (
  flwItem /*: FlwItem */,
  devDays /*: number */,
  spareDevDays /*: SpareDevDays */,
  dStpIndex /*: number */,
) => {
  if (spareDevDays[dStpIndex.toString()] === undefined) {
    spareDevDays[dStpIndex.toString()] = 0;
  }
  if (devDays === 0 && spareDevDays[dStpIndex.toString()] > 0) {
    devDays = spareDevDays[dStpIndex.toString()];
    // console.log(
    //   `Using up ${flwItem.dDysRmnngThisStep} of the ${devDays} days spare capacity in step ${dStpIndex}.`,
    // );
    spareDevDays[dStpIndex.toString()] = 0;
  }
  // Just to be explicit and further processing
  if (devDays === 0 && spareDevDays[dStpIndex.toString()] === 0) {
    return;
  }
  flwItem.dDysRmnngThisStep -= devDays;
  if (flwItem.dDysRmnngThisStep <= 0) {
    // console.log(
    //   `Adding ${Math.abs(
    //     flwItem.dDysRmnngThisStep,
    //   )} to the spare capacity in step ${dStpIndex}.`,
    // );
    // Store the unused capcity
    spareDevDays[dStpIndex.toString()] += Math.abs(flwItem.dDysRmnngThisStep);
    flwItem.dDysRmnngThisStep = 0;
  } else if (spareDevDays[dStpIndex.toString()] > 0) {
    updateDaysAndStoreSpareCapacity(flwItem, 0, spareDevDays, dStpIndex);
  } else {
    // Round the days remaining to 2 decimal places.
    flwItem.dDysRmnngThisStep =
      Math.round(flwItem.dDysRmnngThisStep * 100) / 100;
  }
};
