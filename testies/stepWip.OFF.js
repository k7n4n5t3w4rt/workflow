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
//------------------------------------------------------------------
// IMPORT: FUNCTION UNDER TEST
//------------------------------------------------------------------
import stepWip from "../js/workflow/actions/stepWip.js";
import newClickCube from "../js/workflow/actions/newClickCube.js";
//------------------------------------------------------------------
// TEST: stepWip()
//------------------------------------------------------------------
test("-------------- stepWip.js ---------------------", () /*: void */ => {
  should(1).be.exactly(1);
});
const fixture = () /*: void */ => {
  globalSettings({});
  gSttngs("steps", [
    { name: "Open", status: "backlog", limit: 0, preload: 3 },
    { name: "Ready", status: "wait", limit: 3, preload: 3 },
    { name: "Doing", status: "touch", limit: 3, preload: 3 },
    { name: "Ready for Test", status: "wait", limit: 3, preload: 3 },
    { name: "In Test", status: "touch", limit: 3, preload: 3 },
    { name: "Done", status: "done", limit: 0 },
  ]);
  globalState();
  // Needed for populateSteps()
  gState().clckCbGroup = newClickCube();
  populateSteps();
};

test("When nothing is expedited, the expedited WIP of all steps is 0", () /*: void */ => {
  fixture();
  should(stepWip("0", true)).be.exactly(0);
  should(stepWip("1", true)).be.exactly(0);
  should(stepWip("2", true)).be.exactly(0);
  should(stepWip("3", true)).be.exactly(0);
  should(stepWip("4", true)).be.exactly(0);
  should(stepWip("5", true)).be.exactly(0);
});

test("When one thing is expedited, the expedited stepWip is 1", () /*: void */ => {
  fixture();
  gState().flwMap["0"][0].dExpedite = true;
  should(stepWip("0", true)).be.exactly(1);
  should(stepWip("0", false)).be.exactly(2);
  should(stepWip("1", true)).be.exactly(0);
  should(stepWip("2", true)).be.exactly(0);
  should(stepWip("3", true)).be.exactly(0);
  should(stepWip("4", true)).be.exactly(0);
  should(stepWip("5", true)).be.exactly(0);
});

test("Diverse combinations of expedited and normal WIP are easy", () /*: void */ => {
  fixture();
  gState().flwMap["0"][0].dExpedite = true;
  gState().flwMap["0"][1].dExpedite = true;
  should(stepWip("0", true)).be.exactly(2);
  should(stepWip("0", false)).be.exactly(1);
  gState().flwMap["1"][2].dExpedite = true;
  should(stepWip("1", true)).be.exactly(1);
  should(stepWip("1", false)).be.exactly(2);
  should(stepWip("2", true)).be.exactly(0);
  should(stepWip("3", true)).be.exactly(0);
  gState().flwMap["4"][0].dExpedite = true;
  gState().flwMap["4"][1].dExpedite = true;
  gState().flwMap["4"][2].dExpedite = true;
  should(stepWip("4", true)).be.exactly(3);
  should(stepWip("4", false)).be.exactly(0);
  should(stepWip("5", true)).be.exactly(0);
});