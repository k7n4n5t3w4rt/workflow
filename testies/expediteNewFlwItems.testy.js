// @flow
//------------------------------------------------------------------
// IMPORT: TESTY
//------------------------------------------------------------------
import { test, testPromise, should } from "../../../server/testy.js";
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: SETTINGS/STATE
//------------------------------------------------------------------
import globalSettings from "./globalSettings.js";
import globalState from "./globalState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import populateSteps from "./populateSteps.js";
import newClickCube from "./newClickCube.js";
//------------------------------------------------------------------
// IMPORT: FUNCTION UNDER TEST
//------------------------------------------------------------------
import expediteNewFlwItems from "./expediteNewFlwItems.js";
//------------------------------------------------------------------
// TEST: countExpeditedFlwItems()
//------------------------------------------------------------------
test("------- countExpeditedFlwItems.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});

const fixture = () /*: void */ => {
  globalSettings();
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
  // Just in case some expedited items would otherwise be set
  gSttngs().set("expdtQueueLength", 0);
  populateSteps();
};

test("Counts the correct number of expedited flwItems.", () /*: void */ => {
  fixture();
  gState().set("expdtCount", 1);
  gSttngs().set("expdtQueueLength", 3);
  gState().get("flwMap")["0"][0].dExpedite = true;
  // It doesn't return anything, but it does set gState().get("expdtCount")
  expediteNewFlwItems(gState().get("flwMap")["0"]);
  should(gState().get("expdtCount")).be.exactly(3);
});