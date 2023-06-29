// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// updateDaysRemaining()
//------------------------------------------------------------------
export default (
    stepWip /*: (stpKey: string, expediteFlag: boolean ) => number */,
  ) /*: (flwItems: FlwItem[], dvUnits: number ) => void */ =>
  (flwItems /*: FlwItem[] */, dvUnits /*: number */) /*: void */ => {
    // If there are no dev units, or no flow items, we're done.
    if (dvUnits <= 0 || flwItems.length === 0) {
      return;
    }
    // Apply the adjusted reduction to each flow item.
    flwItems.forEach((flwItem /*: FlwItem */) => {
      // First, work out how many flow items are in the step.
      const wipThisStep = stepWip(
        flwItem.dStpIndex.toString(),
        flwItem.dExpedite,
      );
      // Work out how many days to reduce the `dDysRmnngThisStep` by,
      // based on:
      //  - `dvUnits`: the number of dev units
      //  - `devCapacityAvailable`: the power of each dev unit
      //  - `wipThisStep`: the number of flow items in the step
      //  - `drag`: the drag factor
      const devDays =
        ((dvUnits * gSttngs().get("devCapacityAvailable")) / wipThisStep) *
        (1 - gSttngs().get("drag"));
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
