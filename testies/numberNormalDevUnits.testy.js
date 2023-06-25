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

test("20 devUnits, 2 touchSteps(), factor 0.5", () /*: void */ => {
  fixture();
  gSttngs().set("devUnits", 20);
  // This no longer has an effect. We're assuming that all the devUnits will
  // be available if normal flwItems are being worked on at all
  gSttngs().set("expdtdDvUnitsFactor", 0.5);
  const nmNrmlDvUnts = numberNormalDevUnits();
  should(nmNrmlDvUnts).be.exactly(10);
});

test("5 devUnits, 2 touchSteps(), factor 0.5", () /*: void */ => {
  fixture();
  gSttngs().set("devUnits", 5);
  // This no longer has an effect. We're assuming that all the devUnits will
  // be available if normal flwItems are being worked on at all
  gSttngs().set("expdtdDvUnitsFactor", 0.5);
  const nmNrmlDvUnts = numberNormalDevUnits();
  should(nmNrmlDvUnts).be.exactly(2);
});

test("24 devUnits, 2 touchSteps(), factor 0.33", () /*: void */ => {
  fixture();
  gSttngs().set("devUnits", 24);
  // This no longer has an effect. We're assuming that all the devUnits will
  // be available if normal flwItems are being worked on at all
  gSttngs().set("expdtdDvUnitsFactor", 0.33);
  const nmNrmlDvUnts = numberNormalDevUnits();
  should(nmNrmlDvUnts).be.exactly(12);
});
