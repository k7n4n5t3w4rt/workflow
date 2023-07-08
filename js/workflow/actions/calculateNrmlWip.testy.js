// @flow
//------------------------------------------------------------------------------
// TESTY
//------------------------------------------------------------------------------
import { test, testPromise, should } from "../../../server/testy.js";
//------------------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------------------
import globalSettings from "./globalSettings.js";
import gSttngs from "./gSttngs.js";
import globalState from "./globalState.js";
import gState from "./gState.js";
//------------------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------------------
import newClickCube from "./newClickCube.js";
import populateSteps from "./populateSteps.js";
import newFlwItem from "./newFlwItem.js";
//------------------------------------------------------------------------------
// IMPORT: The function under test
//------------------------------------------------------------------------------
import calculateNrmlWip from "./calculateNrmlWip.js";
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

//------------------------------------------------------------------------------
// TESTS
//------------------------------------------------------------------------------
test("------- calculateNrmlWip.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});
test("Returns the correct wip when nothing is expedite", () /*: void */ => {
  fixture();
  should(calculateNrmlWip()).be.exactly(12);
});
test("Returns the correct wip when one flwItem is expedite", () /*: void */ => {
  fixture();
  // Turn on expedite
  gSttngs().set("expdtQueueLength", 1);
  gSttngs().set("expdtDevFactor", 1);
  // Expedite 1 item
  gState().get("flwMap")["2"][0].dExpedite = true;
  should(calculateNrmlWip()).be.exactly(11);
});
test("Correct when one flwItem is expedite but expdtQueueLength is 0", () /*: void */ => {
  fixture();
  // Turn on expedite
  gSttngs().set("expdtQueueLength", 0);
  gSttngs().set("expdtDevFactor", 1);
  // Expedite 1 item
  gState().get("flwMap")["2"][0].dExpedite = true;
  should(calculateNrmlWip()).be.exactly(12);
});
