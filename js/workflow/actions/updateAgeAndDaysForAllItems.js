// @flow
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
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
//------------------------------------------------------------------
// updateAgeAndDaysForAllItems()
//------------------------------------------------------------------
export default () => {
  // Get all the flwItems
  const flwItems = getAllFlwItems();
  countExpeditedFlwItems(flwItems);
  const { expdtFlwItems, normalFlwItems } = expediteAndNormalFlwItems(
    flwItems.map(makeItOneClickOlder).filter(theDead).filter(nonTouch),
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
// stepWip()
//------------------------------------------------------------------
const stepWip = (
  flwMpKey /*: string */,
  expedited /*: boolean */,
) /*: number */ => {
  return gState().flwMap[flwMpKey].reduce(
    (_ /*: number */, flwItem /*: FlwItem */) /*: number */ => {
      if (flwItem.dExpedite === expedited) {
        return (_ += 1);
      }
      return _;
    },
    0,
  );
};
//------------------------------------------------------------------
// nonTouch()
//------------------------------------------------------------------
const nonTouch = (
  flwItem /*: FlwItem */,
  index /*:number */,
) /*: boolean */ => {
  const stpStatus = gSttngs().steps[flwItem.dStpIndex].status;
  // If this flwItem is in the backlog, don't update it
  if (stpStatus !== "touch") {
    // console.log("nonTouch: Filtering out this flwItem");
    flwItem.dDysRmnngThisStep = 0;
    return false;
  }
  return true;
};
//------------------------------------------------------------------
// theDead()
//------------------------------------------------------------------
const theDead = (flwItem /*: FlwItem */, index /*:number */) /*: boolean */ => {
  if (gSttngs().death > 0 && ++flwItem.dAge >= gSttngs().death) {
    // console.log("theDead: Filtering out this flwItem");
    removeFlowItem(flwItem, index);
    return false;
  }
  return true;
};
//------------------------------------------------------------------
// updateDaysRemainingCurrentStep()
//------------------------------------------------------------------
const updateDaysRemainingCurrentStep = (
  flwItem /*: FlwItem */,
  devPower /*: number */,
  drag /*: number */,
) /*: void */ => {
  // Work out the devPower without any decay or drag
  // If we're skipping this item, set the devPower to 0
  flwItem.dDysRmnngThisStep -= devPower * drag;
  console.log("dDaysRmnngThisStep: " + flwItem.dDysRmnngThisStep);
  if (flwItem.dDysRmnngThisStep <= 0) {
    console.log("This one is zero: ", flwItem);
    flwItem.dDysRmnngThisStep = 0;
  }
};
