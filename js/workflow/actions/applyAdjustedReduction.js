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
//------------------------------------------------------------------
// applyAdjustedReduction()
//------------------------------------------------------------------
export default (
    stepWip /*: (stpKey: string, expediteFlag: boolean ) => number */,
  ) /*: (flwItems: FlwItem[], expediteFlag: boolean ) => void */ =>
  (flwItems /*: FlwItem[] */, expediteFlag /*: boolean */) /*: void */ => {
    // The average dev power per click per step per dev unit across the workflow.
    const avrgDevPowerPerClickPerStepPerDevUnit = calculateDevPower();
    // Apply the adjusted reduction to each flow item.
    flwItems.forEach((flwItem /*: FlwItem */) => {
      // Just the number of dev units for this step.
      let devUnits = gSttngs().get("steps")[flwItem.dStpIndex].devUnits;
      if (expdtIsOn() === true && expediteFlag === true) {
        devUnits = devUnits * gSttngs().get("expdtDvUnitsFactor");
      }
      // First, work out how many flow items are in the step.
      const wipThisStep = stepWip(
        flwItem.dStpIndex.toString(),
        flwItem.dExpedite,
      );
      // If there are no dev units, or no dev capacity, we're done.
      if (devUnits <= 0 || wipThisStep <= 0) {
        return;
      }
      // The `devPowerFactor` is 1.2 for a 1:1 ratio, and 0.8 for a 10:1 ratio.
      const devPowerFactor = calculateDevPowerFactor(wipThisStep, devUnits);
      // Finally, work out how many days to reduce the `dDysRmnngThisStep` by
      const devDays =
        (devUnits * avrgDevPowerPerClickPerStepPerDevUnit * devPowerFactor) /
        wipThisStep;
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
