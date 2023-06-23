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
  const flwItemsOneClickOlder = flwItems.map(makeItOneClickOlder);
  const flwItemsNotDead = flwItemsOneClickOlder.filter(
    theNonDead(removeFlowItem, removeDoneFlwItmsFromFlwMap),
  );
  const flwItemsInTouch = flwItemsNotDead.filter(inTouch);
  const { expdtFlwItems, normalFlwItems } =
    expediteAndNormalFlwItems(flwItemsInTouch);
  const nmExpdtDvUnits = numberExpiditedDevUnits();
  prepAndUpdateDaysRemaining(expdtFlwItems, nmExpdtDvUnits);
  const nmNrmlDvUnits = numberNormalDevUnits();
  // normalFlwItems.forEach((flwItem /*: FlwItem */) => {
  //   flwItem.dSkipForWip = skipForWip(nmNrmlDvUnits, flwItems.length);
  // });
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
    const devPower = gSttngs().devUnits / wipThisStep;
    // console.log("devPower", devPower);
    // const drag = dragFunction(devPower, wipThisStep);
    updateDaysRemainingCurrentStep(flwItem, devPower);
  });
};
//------------------------------------------------------------------
// updateDaysRemainingCurrentStep()
//------------------------------------------------------------------
const updateDaysRemainingCurrentStep = (
  flwItem /*: FlwItem */,
  devPower /*: number */,
) /*: void */ => {
  const dragFactor = 1 - gSttngs().drag;
  flwItem.dDysRmnngThisStep -= devPower * dragFactor;
  if (flwItem.dDysRmnngThisStep <= 0) {
    flwItem.dDysRmnngThisStep = 0;
  }
};
