// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import removeFlowItem from "./removeFlowItem.js";
import getFlwMpSteps from "./getFlwMpSteps.js";
import dragFunction from "./dragFunction.js";
import skipForWip from "./skipForWip.js";
import expediteAndNormalFlwItems from "../calculations/expediteAndNormalFlwItems.js";
import makeItOneClickOlder from "./makeItOneClickOlder.js";
import countExpeditedFlwItems from "./countExpeditedFlwItems.js";
import getAllFlwItems from "./getAllFlwItems.js";
import {
  numberExpiditedDevUnits,
  numberNormalDevUnits,
} from "./numberDevUnits.js";
import theNonDead from "./theNonDead.js";
import inTouch from "./inTouch.js";
import stepWip from "./stepWip.js";
//------------------------------------------------------------------
// updateAgeAndDaysForAllItems()
//------------------------------------------------------------------
export default () /*: void */ => {
  // Get all the flwItems
  const flwItems = getAllFlwItems();
  countExpeditedFlwItems(flwItems);
  const { expdtFlwItems, normalFlwItems } = expediteAndNormalFlwItems(
    flwItems
      .map(makeItOneClickOlder)
      .filter(theNonDead(removeFlowItem))
      .filter(inTouch),
  );
  const nmExpdtDvUnits = numberExpiditedDevUnits();
  prepAndUpdateDaysRemaining(expdtFlwItems, nmExpdtDvUnits);
  const nmNrmlDvUnits = numberNormalDevUnits();
  prepAndUpdateDaysRemaining(normalFlwItems, nmNrmlDvUnits);
};
//------------------------------------------------------------------
// prepAndUpdateDaysRemaining()
//------------------------------------------------------------------
const prepAndUpdateDaysRemaining = (
  flwItems /*: FlwItem[] */,
  dvUnits /*: number */,
) /*: void */ => {
  flwItems.forEach((flwItem /*: FlwItem */) => {
    // If we're skipping, abort
    if (skipForWip(dvUnits, flwItems.length)) {
      return;
    }
    const wipThisStep = stepWip(
      flwItem.dStpIndex.toString(),
      flwItem.dExpedite,
    );
    const devPower = dvUnits / wipThisStep;
    const drag = dragFunction(devPower, wipThisStep);
    updateDaysRemainingCurrentStep(flwItem, devPower, drag);
  });
};
//------------------------------------------------------------------
// updateDaysRemainingCurrentStep()
//------------------------------------------------------------------
const updateDaysRemainingCurrentStep = (
  flwItem /*: FlwItem */,
  devPower /*: number */,
  drag /*: number */,
) /*: void */ => {
  flwItem.dDysRmnngThisStep -= devPower * drag;
  if (flwItem.dDysRmnngThisStep <= 0) {
    flwItem.dDysRmnngThisStep = 0;
  }
};
