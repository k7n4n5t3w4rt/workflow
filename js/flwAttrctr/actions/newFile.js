import gSttngs from "./gSttngs";
import expdtIsOn from "./expdtIsOn";
import calculateDevPower from "./calculateDevPower";
import calculateDevPowerFactor from "./calculateDevPowerFactor";
import calculateFlwTimeAtStart from "./calculateFlwTimeAtStart";
import calculateTouchSteps from "./calculateTouchSteps";

//------------------------------------------------------------------
// applyDevCapacityAllFlwItems()
//------------------------------------------------------------------
export default (
    stepWip /*: (stpKey: string, expediteFlag: boolean ) => number */,
  ) =>
  (flwItems /*: FlwItem[] */, expediteFlag /*: boolean */) => {
    const steps = gSttngs().get("steps");
    const expdtDvUnitsFactor = gSttngs().get("expdtDvUnitsFactor");
    // A container for storing unused dev capacity
    let spareDevDays = 0;
    // Apply the adjusted reduction to each flow item.
    flwItems.forEach((flwItem /*: FlwItem */) => {
      let dStpIndex = flwItem.dStpIndex;
      // A bit of a hacky fix. The `dStpIndex` should never be out of range
      // but if it is, set it to the last step.
      if (dStpIndex > steps.length - 1) {
        dStpIndex = steps.length - 1;
        flwItem.dStpIndex = dStpIndex;
      }
      // The current number of dev units for this step.
      let devUnits = steps[dStpIndex].movingDevUnits;
      // If expedite is on, multiply the dev units by the expedite factor
      // to get the number of dev units allocated to expedited flow items.
      if (expdtIsOn() === true && expediteFlag === true) {
        devUnits = devUnits * expdtDvUnitsFactor;
      }
      // First, work out how many flow items are in the step.
      const wipThisStep = stepWip(dStpIndex.toString(), flwItem.dExpedite);
      // If there are no dev units, or no dev capacity, we're done.
      if (devUnits <= 0 || wipThisStep <= 0) {
        return;
      }
      // The ratio of flow time at start for this step to the total flow time at start.
      const idealStepFlwTime = steps[dStpIndex].flwTimeAtStart;
      const actualStepFlwTime = steps[dStpIndex].actualFlwTime;
      const totalFlwTime = calculateFlwTimeAtStart();
      const avrgFlwTimePerStep = totalFlwTime / calculateTouchSteps();
      const flwTimeRatio = actualStepFlwTime / idealStepFlwTime;
      const devPower = calculateDevPower() / flwTimeRatio;
      const devPowerFactor = calculateDevPowerFactor(wipThisStep, devUnits);
      const devDays = (devUnits * (devPower * devPowerFactor)) / wipThisStep;
      // Reduce the days remaining by the number of days calculated above.
      flwItem.dDysRmnngThisStep -= devDays;
      if (flwItem.dDysRmnngThisStep <= 0) {
        // Store the unused capcity for the next flow item.
        spareDevDays += Math.abs(flwItem.dDysRmnngThisStep);
        flwItem.dDysRmnngThisStep = 0;
      } else {
        // Round the days remaining to 2 decimal places.
        flwItem.dDysRmnngThisStep =
          Math.round(flwItem.dDysRmnngThisStep * 100) / 100;
      }
    });
    if (spareDevDays > 0) {
      // Pull another flow item from the queue
      // Call this function again
    }
  };
