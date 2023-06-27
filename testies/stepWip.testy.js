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
test("------- stepWip.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});
const fixture = () /*: void */ => {
  globalSettings();
  gSttngs().set("expdtLimit", 0);
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

test("Exptedited step WIP when epdtLimit is 0 and nothing is expedited ", () /*: void */ => {
  fixture();
  // Expedited limit is 0. Redundant because it's in the fixture but
  // it's a reminder that it's set to 0.
  gSttngs().set("expdtLimit", 0);
  const expeditedFlag = true;
  should(stepWip("0", expeditedFlag)).be.exactly(3);
  should(stepWip("1", expeditedFlag)).be.exactly(3);
  should(stepWip("2", expeditedFlag)).be.exactly(3);
  should(stepWip("3", expeditedFlag)).be.exactly(3);
  should(stepWip("4", expeditedFlag)).be.exactly(3);
  should(stepWip("5", expeditedFlag)).be.exactly(0);
});

test("Expedited step wip when expdtdLimit is 1 and one thing is expedited", () /*: void */ => {
  fixture();
  gSttngs().set("expdtLimit", 1);
  const expeditedFlag = true;
  gState().get("flwMap")["2"][0].dExpedite = true;
  should(stepWip("0", expeditedFlag)).be.exactly(0);
  should(stepWip("1", expeditedFlag)).be.exactly(0);
  should(stepWip("2", expeditedFlag)).be.exactly(1);
  should(stepWip("3", expeditedFlag)).be.exactly(0);
  should(stepWip("4", expeditedFlag)).be.exactly(0);
  should(stepWip("5", expeditedFlag)).be.exactly(0);
});

test("Normal step wip when expdtLimit is 0 and two things are expedited", () /*: void */ => {
  fixture();
  gSttngs().set("expdtLimit", 0);
  const expeditedFlag = false;
  gState().get("flwMap")["2"][0].dExpedite = true;
  gState().get("flwMap")["2"][1].dExpedite = true;
  should(stepWip("0", expeditedFlag)).be.exactly(3);
  should(stepWip("1", expeditedFlag)).be.exactly(3);
  should(stepWip("2", expeditedFlag)).be.exactly(3);
  should(stepWip("3", expeditedFlag)).be.exactly(3);
  should(stepWip("4", expeditedFlag)).be.exactly(3);
  should(stepWip("5", expeditedFlag)).be.exactly(0);
});

// test("Combinations of expedited and normal", () /*: void */ => {
//   fixture();
//   gState().get("flwMap")["0"][0].dExpedite = true;
//   gState().get("flwMap")["0"][1].dExpedite = true;
//   should(stepWip("0", true)).be.exactly(2);
//   should(stepWip("0", false)).be.exactly(1);
//   gState().get("flwMap")["1"][2].dExpedite = true;
//   should(stepWip("1", true)).be.exactly(1);
//   should(stepWip("1", false)).be.exactly(2);
//   should(stepWip("2", true)).be.exactly(0);
//   should(stepWip("3", true)).be.exactly(0);
//   gState().get("flwMap")["4"][0].dExpedite = true;
//   gState().get("flwMap")["4"][1].dExpedite = true;
//   gState().get("flwMap")["4"][2].dExpedite = true;
//   should(stepWip("4", true)).be.exactly(3);
//   should(stepWip("4", false)).be.exactly(0);
//   should(stepWip("5", true)).be.exactly(0);
// });
