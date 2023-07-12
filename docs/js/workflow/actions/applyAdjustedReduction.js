// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import expdtIsOn from "./expdtIsOn.js";
//------------------------------------------------------------------
// updateDaysRemaining()
//------------------------------------------------------------------
export default (
    stepWip /*: (stpKey: string, expediteFlag: boolean ) => number */,
  ) /*: (flwItems: FlwItem[], expediteFlag: boolean ) => void */ =>
  (flwItems /*: FlwItem[] */, expediteFlag /*: boolean */) /*: void */ => {
    // Apply the adjusted reduction to each flow item.
    flwItems.forEach((flwItem /*: FlwItem */) => {
      let devUnits = gSttngs().get("steps")[flwItem.dStpIndex].devUnits;
      if (expdtIsOn() === true && expediteFlag === true) {
        devUnits = devUnits * gSttngs().get("expdtDvUnitsFactor");
      }
      const devCapacity = gSttngs().get("steps")[flwItem.dStpIndex].devCapacity;
      // If there are no dev units, or no flow items, we're done.
      if (devUnits <= 0 || flwItems.length === 0) {
        return;
      }
      // First, work out how many flow items are in the step.
      const wipThisStep = stepWip(
        flwItem.dStpIndex.toString(),
        flwItem.dExpedite,
      );
      // Work out how many days to reduce the `dDysRmnngThisStep` by,
      // based on:
      //  - `devUnits`: the number of dev units
      //  - `devCapacity`: the power of each dev unit
      //  - `wipThisStep`: the number of flow items in the step
      const devDays = (devUnits * devCapacity) / wipThisStep;
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
