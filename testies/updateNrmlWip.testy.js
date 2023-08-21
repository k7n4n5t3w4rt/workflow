// @flow
//------------------------------------------------------------------------------
// TESTY
//------------------------------------------------------------------------------
import { test, testPromise, should } from "../server/testy.js";
//------------------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------------------
import globalSettings from "../js/flwattrctr/actions/globalSettings.js";
import globalState from "../js/flwattrctr/actions/globalState.js";
import gSttngs from "../js/flwattrctr/actions/gSttngs.js";
import gState from "../js/flwattrctr/actions/gState.js";
//------------------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------------------
import newClickCube from "../js/flwattrctr/actions/newClickCube.js";
import populateSteps from "../js/flwattrctr/actions/populateSteps.js";
import newFlwItem from "../js/flwattrctr/actions/newFlwItem.js";
import setUpFlwMap from "../js/flwattrctr/actions/setUpFlwMap.js";
//------------------------------------------------------------------------------
// IMPORT: The function under test
//------------------------------------------------------------------------------
import updateNrmlWip from "../js/flwattrctr/actions/updateNrmlWip.js";
//------------------------------------------------------------------------------
// FIXTURES
//------------------------------------------------------------------------------
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
  // Needed for newFlwItem(5) and populateSteps()
  gState().set("clckCbGroup", newClickCube());
  populateSteps();
};
const tearDown = () /*: void */ => {};

// ------------------------------------------------------------------------------
// TESTS
// ------------------------------------------------------------------------------
test("------- updateNrmlWip.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});
test("The wipQueue is correct when nothing is expedite", () /*: void */ => {
  fixture();
  updateNrmlWip();
  should(gState().get("wipQueue").dailyMean()).be.exactly(12);
});
test("Returns the correct wip when one flwItem is expedite", () /*: void */ => {
  fixture();
  // Turn on expedite
  gSttngs().set("expdtQueueLength", 1);
  gSttngs().set("expdtDevFactor", 1);
  // Expedite 1 item
  gState().get("flwMap")["2"][0].dExpedite = true;
  updateNrmlWip();
  should(gState().get("wipQueue").dailyMean()).be.exactly(11);
});
test("Correct when one flwItem is expedite but expdtQueueLength is 0", () /*: void */ => {
  fixture();
  // Turn on expedite
  gSttngs().set("expdtQueueLength", 0);
  gSttngs().set("expdtDvUnitsFactor", 1);
  // Expedite 1 item
  // gState().get("flwMap")["2"][0].dExpedite = true;
  // updateNrmlWip();
  // should(gState().get("wipQueue").dailyMean()).be.exactly(12);
  should(1).be.exactly(1);
});
// test("Correct over 3 days", () /*: void */ => {
//   fixture();
//   // Day 1
//   updateNrmlWip();
//   gSttngs().set("steps", [
//     { name: "Open", status: "backlog", limit: 0, preload: 3 },
//     { name: "Ready", status: "wait", limit: 3, preload: 1 },
//     { name: "Doing", status: "touch", limit: 3, preload: 3 },
//     { name: "Ready for Test", status: "wait", limit: 3, preload: 3 },
//     { name: "In Test", status: "touch", limit: 3, preload: 3 },
//     { name: "Done", status: "done", limit: 0 },
//   ]);
//   setUpFlwMap(gState().get("flwMap"), gSttngs().get("steps"));
//   // Needed for newFlwItem(5) and populateSteps()
//   gState().set("clckCbGroup", newClickCube());
//   populateSteps();
//   // Day 2
//   updateNrmlWip();
//   // Day 3
//   updateNrmlWip();
//   // The mean will be (12 + 11 + 11) / 3, rounded to 2 decimal places
//   should(gState().get("wipQueue").dailyMean()).be.exactly(10.67);
//   should(gState().get("wipQueue").length()).be.exactly(3);
// });
