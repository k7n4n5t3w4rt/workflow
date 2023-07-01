// @flow
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
import populateSteps from "../js/workflow/actions/populateSteps.js";
import newClickCube from "../js/workflow/actions/newClickCube.js";
import newFlwItem from "../js/workflow/actions/newFlwItem.js";
//------------------------------------------------------------------
// IMPORT: FUNCTION UNDER TEST
//------------------------------------------------------------------
import applyAdjustedReduction from "../js/workflow/actions/applyAdjustedReduction.js";
//------------------------------------------------------------------
// MOCK: HELPERS
//------------------------------------------------------------------
//------------------------------------------------------------------
// TESTING: applyAdjustedReduction()
//------------------------------------------------------------------
test("------- applyAdjustedReduction.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});

const fixture = () /*: void */ => {
  globalSettings();
  gSttngs().set("expdtQueueLength", 0);
  gSttngs().set("steps", [
    { name: "Open", status: "backlog", limit: 0, preload: 3 },
    { name: "Ready", status: "wait", limit: 3, preload: 3 },
    { name: "Doing", status: "touch", limit: 3, preload: 3 },
    { name: "Ready for Test", status: "wait", limit: 3, preload: 3 },
    { name: "In Test", status: "touch", limit: 3, preload: 3 },
    { name: "Done", status: "done", limit: 0 },
  ]);
  globalState();
  // Needed for populateSteps()
  gState().set("clckCbGroup", newClickCube());
  populateSteps();
};

test("Applies the right reduction to remaining days - normal.", () /*: void */ => {
  fixture();
  // Mock the stepWip() function
  const stepWip = (stpKey /*: string */, expediteFlag /*: boolean */) => {
    return 3;
  };
  gSttngs().set("devCapacityAvailable", 1);
  gSttngs().set("drag", 0.5);
  const flwItems = gState().get("flwMap")["2"];
  const dvUnits = 2;
  flwItems[0].dDysRmnngThisStep = 3;
  flwItems[0].dExpedite = false;
  flwItems[1].dDysRmnngThisStep = 6;
  flwItems[1].dExpedite = false;
  flwItems[2].dDysRmnngThisStep = 12;
  flwItems[2].dExpedite = false;
  applyAdjustedReduction(stepWip)(flwItems, dvUnits);
  should(flwItems[0].dDysRmnngThisStep).be.exactly(2.67);
  should(flwItems[1].dDysRmnngThisStep).be.exactly(5.67);
  should(flwItems[2].dDysRmnngThisStep).be.exactly(11.67);
});
