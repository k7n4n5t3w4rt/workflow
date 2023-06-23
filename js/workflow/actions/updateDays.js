// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import removeFlowItem from "./removeFlowItem.js";
import removeDoneFlwItmsFromFlwMap from "./removeDoneFlwItmsFromFlwMap.js";
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
  const flwItemsNotDead = flwItems.filter(
    theNonDead(removeFlowItem, removeDoneFlwItmsFromFlwMap),
  );
  const flwItemsInTouch = flwItemsNotDead.filter(inTouch);
  const { expdtFlwItems, normalFlwItems } =
    expediteAndNormalFlwItems(flwItemsInTouch);
  const nmExpdtDvUnits = numberExpiditedDevUnits();
  updateDaysRemaining(expdtFlwItems, nmExpdtDvUnits);
  const nmNrmlDvUnits = numberNormalDevUnits();
  // normalFlwItems.forEach((flwItem /*: FlwItem */) => {
  //   flwItem.dSkipForWip = skipForWip(nmNrmlDvUnits, flwItems.length);
  // });
  updateDaysRemaining(normalFlwItems, nmNrmlDvUnits);
};
//------------------------------------------------------------------
// prepAndUpdateDaysRemaining()
//------------------------------------------------------------------
const updateDaysRemaining = (
  flwItems /*: FlwItem[] */,
  dvUnits /*: number */,
) /*: void */ => {
  flwItems.forEach((flwItem /*: FlwItem */) => {
    const wipThisStep = stepWip(
      flwItem.dStpIndex.toString(),
      flwItem.dExpedite,
    );
    // // If we're skipping, abort
    // if (flwItem.dSkipForWip === true) {
    //   flwItem.dSkipForWip = false;
    //   return;
    // }
    // console.log("devUnits", gSttngs().devUnits);
    // console.log("wip", gState().wipQueue.mean());
    const devDays =
      ((gSttngs().devUnits * gSttngs().devPower) / wipThisStep) *
      (1 - gSttngs().drag);
    // console.log("devPower", devPower);
    // const drag = dragFunction(devPower, wipThisStep);
    updateDaysRemainingCurrentStep(flwItem, devDays);
  });
};
//------------------------------------------------------------------
// updateDaysRemainingCurrentStep()
//------------------------------------------------------------------
const updateDaysRemainingCurrentStep = (
  flwItem /*: FlwItem */,
  devDays /*: number */,
) /*: void */ => {
  flwItem.dDysRmnngThisStep -= devDays;
  if (flwItem.dDysRmnngThisStep <= 0) {
    flwItem.dDysRmnngThisStep = 0;
  }
};
