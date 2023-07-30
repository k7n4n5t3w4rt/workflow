// @flow
//------------------------------------------------------------------------------
// TESTY
//------------------------------------------------------------------------------
import { test, testPromise, should } from "../../../server/testy.js";
//------------------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------------------
import globalSettings from "./globalSettings.js";
import globalState from "./globalState.js";
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------------------
import newClickCube from "./newClickCube.js";
import populateSteps from "./populateSteps.js";
import newFlwItem from "./newFlwItem.js";
import setUpFlwMap from "./setUpFlwMap.js";
//------------------------------------------------------------------------------
// IMPORT: The function under test
//------------------------------------------------------------------------------
import updateExpdtWip from "./updateExpdtWip.js";
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
test("------- updateExpdtWip.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});
test("The wipExpQueue is correct when nothing is expedite", () /*: void */ => {
  fixture();
  updateExpdtWip();
  should(gState().get("wipExpQueue").dailyMean()).be.exactly(0);
});
test("Returns the correct wip when one flwItem is expedite", () /*: void */ => {
  fixture();
  // Turn on expedite
  gSttngs().set("expdtQueueLength", 1);
  gSttngs().set("expdtDevFactor", 1);
  // Expedite 1 item
  gState().get("flwMap")["2"][0].dExpedite = true;
  updateExpdtWip();
  should(gState().get("wipExpQueue").dailyMean()).be.exactly(1);
});
test("Correct when one flwItem is expedite but expdtQueueLength is 0", () /*: void */ => {
  fixture();
  // Turn on expedite
  gSttngs().set("expdtQueueLength", 0);
  gSttngs().set("expdtDevFactor", 1);
  // Expedite 1 item
  gState().get("flwMap")["2"][0].dExpedite = true;
  updateExpdtWip();
  should(gState().get("wipExpQueue").dailyMean()).be.exactly(0);
});
test("Correct over 3 days", () /*: void */ => {
  fixture();
  gSttngs().set("expdtQueueLength", 1);
  gSttngs().set("expdtDevFactor", 1);
  // Day 1
  updateExpdtWip();
  gSttngs().set("steps", [
    { name: "Open", status: "backlog", limit: 0, preload: 3 },
    { name: "Ready", status: "wait", limit: 3, preload: 1 },
    { name: "Doing", status: "touch", limit: 3, preload: 3 },
    { name: "Ready for Test", status: "wait", limit: 3, preload: 3 },
    { name: "In Test", status: "touch", limit: 3, preload: 3 },
    { name: "Done", status: "done", limit: 0 },
  ]);
  setUpFlwMap(gState().get("flwMap"), gSttngs().get("steps"));
  // Needed for newFlwItem(5) and populateSteps()
  gState().set("clckCbGroup", newClickCube());
  populateSteps();
  gState().get("flwMap")["2"][0].dExpedite = true;
  gState().get("flwMap")["2"][1].dExpedite = true;
  gState().get("flwMap")["2"][2].dExpedite = true;
  // Day 2
  updateExpdtWip();
  // Day 3
  updateExpdtWip();
  // The mean will be (12 + 11 + 11) / 3, rounded to 2 decimal places
  should(gState().get("wipExpQueue").dailyMean()).be.exactly(2);
  should(gState().get("wipExpQueue").length()).be.exactly(3);
});
