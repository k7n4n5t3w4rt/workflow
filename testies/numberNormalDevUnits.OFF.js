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
test("-------------- numberNormalDevUnits.js ---------------------", () /*: void */ => {
  should(1).be.exactly(1);
});

test("20 devUnits, 2 touchSteps() and factor of 0.5 return 5", () /*: void */ => {
  globalSettings({});
  globalState();
  gSttngs().set("devUnits", 20);
  gSttngs().set("expdtdDvUnitsFactor", 0.5);
  const nmNrmlDvUnts = numberNormalDevUnits();
  should(nmNrmlDvUnts).be.exactly(5);
});

test("5 devUnits, 2 touchSteps() and factor of 0.5 return 1", () /*: void */ => {
  globalSettings({});
  globalState();
  gSttngs().set("devUnits", 5);
  gSttngs().set("expdtdDvUnitsFactor", 0.5);
  const nmNrmlDvUnts = numberNormalDevUnits();
  should(nmNrmlDvUnts).be.exactly(1);
});

test("24 devUnits, 2 touchSteps() and factor of 0.33 return 8", () /*: void */ => {
  globalSettings({});
  globalState();
  gSttngs().set("devUnits", 24);
  gSttngs().set("expdtdDvUnitsFactor", 0.33);
  const nmNrmlDvUnts = numberNormalDevUnits();
  should(nmNrmlDvUnts).be.exactly(8);
});
