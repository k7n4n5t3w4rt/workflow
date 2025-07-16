// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import filterDoneItems from "./click.js_filterDoneItems.js";
import addNewFlowItemsAtArrivalRateHeadless from "./addNewFlowItemsAtArrivalRateHeadless.js";
import updateNrmlWip from "./click.js_updateNrmlWip.js";
import resizeVSphereHeadless from "./resizeVSphereHeadless.js";
import updateAgeHeadless from "./updateAgeHeadless.js";
import updateDays from "./click.js_updateDays.js";
import updateTimeBoxMetricsHeadless from "./updateTimeBoxMetricsHeadless.js";
import updateClickMetrics from "./click.js_updateClickMetrics.js";
import removeDoneFlwItmsFromFlwMap from "./click.js_removeDoneFlwItmsFromFlwMap.js";
import recursivelyPullFlwItemsHeadless from "./recursivelyPullFlwItemsHeadless.js";
import moveHeadless from "./moveHeadless.js";
import autoMoveDevUnits from "./autoMoveDevUnits.js";
//------------------------------------------------------------------
// postClickActionsHeadless()
//------------------------------------------------------------------
export const clickActionsHeadless = () /*: void */ => {
  // Globals
  const flwItmsToMove /*: FlwItmsToMove */ = gState().get("flwItmsToMove");
  const timeBox = gSttngs().get("timeBox");
  const clicks = gState().get("clicks");
  // Do all the moving
  const keys = Object.keys(flwItmsToMove);
  for (let i = 0; i < keys.length; ++i) {
    const flwItem = flwItmsToMove[keys[i]];
    delete flwItmsToMove[keys[i]];
    console.log(`clickActionsHeadless(): Just about to call moveHeadless()`);
    moveHeadless(flwItem);
  }
  if (gSttngs().get("devUnitsMoveToWork")) {
    autoMoveDevUnits();
  }
  console.log(
    `clickActionsHeadless(): Just about to call addNewFlowItemsAtArrivalRateHeadless()`,
  );
  // NOTE: The order of these function calls is important
  addNewFlowItemsAtArrivalRateHeadless();
  // setExpedite();
  // resizeVSphereHeadless();
  console.log(`clickActionsHeadless(): Just about to call updateAgeHeadless()`);
  updateAgeHeadless();
  console.log(`clickActionsHeadless(): Just about to call updateDays()`);
  updateDays();
  console.log(
    `clickActionsHeadless(): Just about to recursively pull flow items with recursivelyPullFlwItemsHeadless()`,
  );
  recursivelyPullFlwItemsHeadless();
  // updateExpdtWip();
  updateNrmlWip();
  filterDoneItems(removeDoneFlwItmsFromFlwMap)();
  updateClickMetrics();
  if (gState().get("clicks") === timeBox) {
    updateTimeBoxMetricsHeadless();
  }
};

export default clickActionsHeadless;
