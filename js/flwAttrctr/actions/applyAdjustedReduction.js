// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import expdtIsOn from "./expdtIsOn.js";
import calculateDevPower from "./calculateDevPower.js";
import calculateDevPowerFactor from "./calculateDevPowerFactor.js";
import calculateFlwTimeAtStart from "./calculateFlwTimeAtStart.js";
import calculateTouchSteps from "./calculateTouchSteps.js";
//------------------------------------------------------------------
// applyAdjustedReduction()
//------------------------------------------------------------------
export default (
    stepWip /*: (stpKey: string, expediteFlag: boolean ) => number */,
  ) /*: (flwItems: FlwItem[], expediteFlag: boolean ) => void */ =>
  (flwItems /*: FlwItem[] */, expediteFlag /*: boolean */) /*: void */ => {
    // Apply the adjusted reduction to each flow item.
    flwItems.forEach((flwItem /*: FlwItem */) => {
      // Just the number of dev units for this step.
      let dStpIndex = flwItem.dStpIndex;
      if (dStpIndex > gSttngs().get("steps").length - 1) {
        dStpIndex = gSttngs().get("steps").length - 1;
        flwItem.dStpIndex = dStpIndex;
      }
      let devUnits = gSttngs().get("steps")[dStpIndex].movingDevUnits;
      if (expdtIsOn() === true && expediteFlag === true) {
        devUnits = devUnits * gSttngs().get("expdtDvUnitsFactor");
      }
      // First, work out how many flow items are in the step.
      const wipThisStep = stepWip(dStpIndex.toString(), flwItem.dExpedite);
      // If there are no dev units, or no dev capacity, we're done.
      if (devUnits <= 0 || wipThisStep <= 0) {
        return;
      }
      // The ratio of flow time at start for this step to the total flow time at start.
      const idealStepFlwTime = gSttngs().get("steps")[dStpIndex].flwTimeAtStart;
      const actualStepFlwTime = gSttngs().get("steps")[dStpIndex].actualFlwTime;
      const totalFlwTime = calculateFlwTimeAtStart();
      const avrgFlwTimePerStep = totalFlwTime / calculateTouchSteps();
      const flwTimeRatio = actualStepFlwTime / idealStepFlwTime;
      const devPower = calculateDevPower() / flwTimeRatio;
      // The `devPowerFactor` is 1.2 for a 1:1 ratio, and 0.8 for a 10:1 ratio.
      const devPowerFactor = calculateDevPowerFactor(wipThisStep, devUnits);
      // const devPowerFactor = 1; // The simple, linear version.
      // Finally, work out how many days to reduce the `dDysRmnngThisStep` by
      const devDays = (devUnits * devPower * devPowerFactor) / wipThisStep;
      // Reduce the days remaining by the number of days calculated above.
      flwItem.dDysRmnngThisStep -= devDays;
      // Round the days remaining to 2 decimal places.
      flwItem.dDysRmnngThisStep =
        Math.round(flwItem.dDysRmnngThisStep * 100) / 100;
      if (flwItem.dDysRmnngThisStep <= 0) {
        flwItem.dDysRmnngThisStep = 0;
      }
    });
  };
