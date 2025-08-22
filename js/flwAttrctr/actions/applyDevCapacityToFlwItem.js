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
    // console.log(
    //   `applyDevCapacityToFlwItem(): Applying dev capacity to flow item "${flwItem.name}" in step ${dStpIndex} with days remaining: ${flwItem.dDysRmnngThisStep}`,
    // );
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
      // console.log(
      //   `applyDevCapacityToFlwItem(): devDays = (${devUnits} * (${devPower} * ${devPowerFactor})) / ${wipThisStep};`,
      // );
      devDays = (devUnits * (devPower * devPowerFactor)) / wipThisStep;
    }
    if (isNaN(devDays)) {
      console.error(
        `applyDevCapacityToFlwItem(): devDays is NaN for flow item "${flwItem.name}" in step ${dStpIndex}.`,
      );
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
  // console.log(
  //   "updateDaysAndStoreSpareCapacity(): *************************************************************",
  // );
  if (spareDevDays[dStpIndex.toString()] === undefined) {
    spareDevDays[dStpIndex.toString()] = 0;
    // console.log(
    //   `updateDaysAndStoreSpareCapacity(): No spare capacity for step ${dStpIndex}. Initialised to 0.`,
    // );
  }
  if (devDays === 0 && spareDevDays[dStpIndex.toString()] > 0) {
    devDays = spareDevDays[dStpIndex.toString()];
    // console.log(
    //   `updateDaysAndStoreSpareCapacity(): Using up ${flwItem.dDysRmnngThisStep} of the ${devDays} days spare capacity in step ${dStpIndex}.`,
    // );
    spareDevDays[dStpIndex.toString()] = 0;
  }
  // Just to be explicit and further processing
  if (devDays === 0 && spareDevDays[dStpIndex.toString()] === 0) {
    return;
  }
  // console.log(
  //   `updateDaysAndStoreSpareCapacity(): ${flwItem.dDysRmnngThisStep} -= ${devDays}...`,
  // );
  flwItem.dDysRmnngThisStep -= devDays;
  // console.log(
  //   `updateDaysAndStoreSpareCapacity(): Updated ${flwItem.name} in step ${dStpIndex} to ${flwItem.dDysRmnngThisStep} days remaining.`,
  // );
  if (flwItem.dDysRmnngThisStep <= 0) {
    // console.log(
    //   `updateDaysAndStoreSpareCapacity(): Flow item "${
    //     flwItem.name
    //   }" in step ${dStpIndex} has ${
    //     flwItem.dDysRmnngThisStep
    //   } days remaining. Adding ${Math.abs(
    //     flwItem.dDysRmnngThisStep,
    //   )} to the spare capacity in step ${dStpIndex}.`,
    // );
    // Store the unused capcity
    spareDevDays[dStpIndex.toString()] += Math.abs(flwItem.dDysRmnngThisStep);
    flwItem.dDysRmnngThisStep = 0;
    // console.log(
    //   `updateDaysAndStoreSpareCapacity(): Flow item "${flwItem.name}" in step ${dStpIndex} now has ${flwItem.dDysRmnngThisStep} days remaining.`,
    // );
  } else if (spareDevDays[dStpIndex.toString()] > 0) {
    // console.log(
    //   `updateDaysAndStoreSpareCapacity(): Updating days again for "${flwItem.name}" to use up spare capacity in step ${dStpIndex}.`,
    // );
    updateDaysAndStoreSpareCapacity(flwItem, 0, spareDevDays, dStpIndex);
  } else {
    // Round the days remaining to 2 decimal places.
    flwItem.dDysRmnngThisStep =
      Math.round(flwItem.dDysRmnngThisStep * 100) / 100;
    // console.log(
    //   `updateDaysAndStoreSpareCapacity(): Rounded ${flwItem.dDysRmnngThisStep} to ${flwItem.dDysRmnngThisStep} days remaining.`,
    // );
  }
  if (isNaN(flwItem.dDysRmnngThisStep)) {
    console.error(
      `updateDaysAndStoreSpareCapacity(): Flow item "${flwItem.name}" in step ${dStpIndex} has NaN days remaining.`,
    );
  }
  // console.log(
  //   `updateDaysAndStoreSpareCapacity(): Flow item "${flwItem.name}" in step ${dStpIndex} has ${flwItem.dDysRmnngThisStep} days remaining.`,
  // );
};
