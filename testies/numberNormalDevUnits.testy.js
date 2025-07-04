// @flow
//------------------------------------------------------------------
// IMPORT: TESTY
//------------------------------------------------------------------
import { test, testPromise, should } from "../server/testy.js";
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../js/flwattrctr/actions/gSttngs.js";
//------------------------------------------------------------------
// IMPORT: SETTINGS/STATE
//------------------------------------------------------------------
import globalSettings from "../js/flwattrctr/actions/globalSettings.js";
import globalState from "../js/flwattrctr/actions/globalState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
//------------------------------------------------------------------
// IMPORT: FUNCTION UNDER TEST
//------------------------------------------------------------------
import { numberNormalDevUnits } from "../js/flwattrctr/actions/numberDevUnits.js";
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
    { name: "Open", status: "backlog", limit: 0, movingLimit: 0, avAge: 0, devUnits: 0, flwTimeAtStart: 0, actualFlwTime: 0, movingDevUnits: 0 },
    { name: "Ready", status: "wait", limit: 3, movingLimit: 3, avAge: 0, devUnits: 0, flwTimeAtStart: 0, actualFlwTime: 0, movingDevUnits: 0 },
    { name: "Doing", status: "touch", limit: 3, movingLimit: 3, avAge: 0, devUnits: 0, flwTimeAtStart: 0, actualFlwTime: 0, movingDevUnits: 0 },
    { name: "Ready for Test", status: "wait", limit: 3, movingLimit: 3, avAge: 0, devUnits: 0, flwTimeAtStart: 0, actualFlwTime: 0, movingDevUnits: 0 },
    { name: "In Test", status: "touch", limit: 3, movingLimit: 3, avAge: 0, devUnits: 0, flwTimeAtStart: 0, actualFlwTime: 0, movingDevUnits: 0 },
    { name: "Done", status: "done", limit: 0, movingLimit: 0, avAge: 0, devUnits: 0, flwTimeAtStart: 0, actualFlwTime: 0, movingDevUnits: 0 },
  ]);
  globalState();
};

test("With expedited items, 20 devUnits, 2 touchSteps(), factor 0.5", () /*: void */ => {
  fixture();
  // Just so it's not 0
  gSttngs().set("expdtQueueLength", 1);
  gSttngs().set("devUnits", 20);
  gSttngs().set("expdtDvUnitsFactor", 0.5);
  const nmNrmlDvUnts = numberNormalDevUnits();
  should(nmNrmlDvUnts).be.exactly(5);
});

test("When there is no `expdtQueueLength` it's all normal / touch steps", () /*: void */ => {
  fixture();
  // Just so it's not 0
  gSttngs().set("expdtQueueLength", 0);
  gSttngs().set("devUnits", 20);
  gSttngs().set("expdtDvUnitsFactor", 0.5);
  const nmNrmlDvUnts = numberNormalDevUnits();
  should(nmNrmlDvUnts).be.exactly(10);
});

test("5 devUnits, 2 touchSteps(), factor 0.5", () /*: void */ => {
  fixture();
  // Just so it's not 0
  gSttngs().set("expdtQueueLength", 1);
  gSttngs().set("devUnits", 5);
  gSttngs().set("expdtDvUnitsFactor", 0.5);
  const nmNrmlDvUnts = numberNormalDevUnits();
  should(nmNrmlDvUnts).be.exactly(1.25);
});

test("24 devUnits, 2 touchSteps(), factor 0.33", () /*: void */ => {
  fixture();
  // Just so it's not 0
  gSttngs().set("expdtQueueLength", 1);
  gSttngs().set("devUnits", 24);
  gSttngs().set("expdtDvUnitsFactor", 1 / 3);
  const nmNrmlDvUnts = numberNormalDevUnits();
  should(nmNrmlDvUnts).be.exactly(8);
});

test("No expedited items, 24 devUnits, 2 touchSteps(), factor 0.33", () /*: void */ => {
  fixture();
  gSttngs().set("expdtQueueLength", 0);
  gSttngs().set("devUnits", 24);
  gSttngs().set("expdtDvUnitsFactor", 1 / 3);
  const nmNrmlDvUnts = numberNormalDevUnits();
  should(nmNrmlDvUnts).be.exactly(12);
});