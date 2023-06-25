//------------------------------------------------------------------
// IMPORT: TESTY
//------------------------------------------------------------------
import { test, testPromise, should } from "../server/testy.js";
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../js/workflow/actions/gSttngs.js";
import gState from "../js/workflow/actions/gState.js";
//------------------------------------------------------------------
// IMPORT: SETTINGS/STATE
//------------------------------------------------------------------
import globalSettings from "../js/workflow/actions/globalSettings.js";
import globalState from "../js/workflow/actions/globalState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import newClickCube from "../js/workflow/actions/newClickCube.js";
import newFlwItem from "../js/workflow/actions/newFlwItem.js";
import populateSteps from "../js/workflow/actions/populateSteps.js";
import updateFlowMap from "../js/workflow/actions/updateFlowMap.js";
//------------------------------------------------------------------
// IMPORT: FUNCTION UNDER TEST
//------------------------------------------------------------------
import pullFlowItem from "../js/workflow/actions/pullFlowItem.js";
//------------------------------------------------------------------
// MOCKS
//------------------------------------------------------------------
const move = (flwItem /*: FlwItem */) /*: void */ => {
  // Set the properties of the flwItem to the state they'll
  // should be in when the animation is complete.
  //flwItem.dMoving = true;
  flwItem.dStpIndex++;
  // We don't want to reset the days remaining if the item is
  // in the last step, i.e. Done
  if (flwItem.dStpIndex < gSttngs().get("steps").length - 1) {
    flwItem.dDysRmnngThisStep = flwItem.dDysEachTouchStep;
  }
};
// const updateFlowMap = (
//   flwItem /*: FlwItem */,
//   index /*: number */,
// ) /*: void */ => {};
//------------------------------------------------------------------
// TESTING: pullFlowItem()
//------------------------------------------------------------------
test("------- pullFlowItem.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});
// We need a good flwMap full of flwItems
const fixture = () /*: void */ => {
  globalSettings();
  gSttngs().set("steps", [
    { name: "Open", status: "backlog", limit: 0, preload: 2 },
    { name: "Ready", status: "wait", limit: 0, preload: 2 },
    { name: "Doing", status: "touch", limit: 0, preload: 2 },
    { name: "Ready for Test", status: "wait", limit: 0, preload: 2 },
    { name: "In Test", status: "touch", limit: 0, preload: 1 },
    { name: "Done", status: "done", limit: 0 },
  ]);
  gSttngs().set("wipLimit", 2);
  gSttngs().set("expdtLimit", 0);
  globalState();
  // Needed for populateSteps()
  gState().set("clckCbGroup", newClickCube());
  populateSteps();
};
// Teardown is not needed for this one
const tearDown = () /*: void */ => {};
// For this one, so far, we can just call the fixture() function once
fixture();
// NOTE: We need a load more tests for the edge cases where nothing is
// moved because the limits are reached, etc.
//------------------------------------------------------------------
// TEST: "Pulls expedited items"
//------------------------------------------------------------------
test("Pulls expedited items", () /*: void */ => {
  //fixture();
  const flwItem = gState().get("flwMap")["1"][0];
  flwItem.dExpedite = true;
  const expediteFlag = true;
  const index = 0;
  let availableLimit = 0;
  availableLimit = pullFlowItem(expediteFlag, move, updateFlowMap)(
    availableLimit,
    flwItem,
    index,
  );
  should(availableLimit).be.exactly(0);
  should(flwItem.dStpIndex).be.exactly(2);
  //tearDown();
});
//------------------------------------------------------------------
// TEST: "Pulls normal items"
//------------------------------------------------------------------
test("Pulls normal items", () /*: void */ => {
  //fixture();
  const flwItem = gState().get("flwMap")["3"][0];
  flwItem.dExpedite = false; // redundant
  const expediteFlag = false;
  const index = 0;
  let availableLimit = 1;
  availableLimit = pullFlowItem(expediteFlag, move, updateFlowMap)(
    availableLimit,
    flwItem,
    index,
  );
  should(availableLimit).be.exactly(0);
  should(flwItem.dStpIndex).be.exactly(4);
  //tearDown();
});
