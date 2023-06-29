// @flow
//------------------------------------------------------------------
// IMPORT: TESTY
//------------------------------------------------------------------
import { test, testPromise, should } from "../server/testy.js";
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../js/workflow/actions/gSttngs.js";
//------------------------------------------------------------------
// IMPORT: SETTINGS/STATE
//------------------------------------------------------------------
import globalSettings from "../js/workflow/actions/globalSettings.js";
import globalState from "../js/workflow/actions/globalState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import dragFunction from "../js/workflow/actions/dragFunction.js";
//------------------------------------------------------------------
// IMPORT: FUNCTION UNDER TEST
//------------------------------------------------------------------
import { numberNormalDevUnits } from "../js/workflow/actions/numberDevUnits.js";
//------------------------------------------------------------------
// TEST: dragFunction
//------------------------------------------------------------------
test("------- numberNormalDevUnits.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});

const fixture = () /*: void */ => {
  globalSettings();
  // So there are 2 touch steps
  gSttngs().set("steps", [
    { name: "Open", status: "backlog", limit: 0, preload: 3 },
    { name: "Ready", status: "wait", limit: 3, preload: 3 },
    { name: "Doing", status: "touch", limit: 3, preload: 3 },
    { name: "Ready for Test", status: "wait", limit: 3, preload: 3 },
    { name: "In Test", status: "touch", limit: 3, preload: 3 },
    { name: "Done", status: "done", limit: 0 },
  ]);
  globalState();
};

test("With expedited items, 20 devUnits, 2 touchSteps(), factor 0.5", () /*: void */ => {
  fixture();
  // Just so it's not 0
  gSttngs().set("expdtQueueLength", 1);
  gSttngs().set("devUnits", 20);
  gSttngs().set("expdtdDvUnitsFactor", 0.5);
  const nmNrmlDvUnts = numberNormalDevUnits();
  should(nmNrmlDvUnts).be.exactly(5);
});

test("When there is no `expdtQueueLength` it's all normal / touch steps", () /*: void */ => {
  fixture();
  // Just so it's not 0
  gSttngs().set("expdtQueueLength", 0);
  gSttngs().set("devUnits", 20);
  gSttngs().set("expdtdDvUnitsFactor", 0.5);
  const nmNrmlDvUnts = numberNormalDevUnits();
  should(nmNrmlDvUnts).be.exactly(10);
});

test("5 devUnits, 2 touchSteps(), factor 0.5", () /*: void */ => {
  fixture();
  // Just so it's not 0
  gSttngs().set("expdtQueueLength", 1);
  gSttngs().set("devUnits", 5);
  gSttngs().set("expdtdDvUnitsFactor", 0.5);
  const nmNrmlDvUnts = numberNormalDevUnits();
  should(nmNrmlDvUnts).be.exactly(1.25);
});

test("24 devUnits, 2 touchSteps(), factor 0.33", () /*: void */ => {
  fixture();
  // Just so it's not 0
  gSttngs().set("expdtQueueLength", 1);
  gSttngs().set("devUnits", 24);
  gSttngs().set("expdtdDvUnitsFactor", 1 / 3);
  const nmNrmlDvUnts = numberNormalDevUnits();
  should(nmNrmlDvUnts).be.exactly(8);
});

test("No expedited items, 24 devUnits, 2 touchSteps(), factor 0.33", () /*: void */ => {
  fixture();
  gSttngs().set("expdtQueueLength", 0);
  gSttngs().set("devUnits", 24);
  gSttngs().set("expdtdDvUnitsFactor", 1 / 3);
  const nmNrmlDvUnts = numberNormalDevUnits();
  should(nmNrmlDvUnts).be.exactly(12);
});
