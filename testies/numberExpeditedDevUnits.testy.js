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
import { numberExpiditedDevUnits } from "../js/workflow/actions/numberDevUnits.js";
//------------------------------------------------------------------
// TEST: dragFunction
//------------------------------------------------------------------
test("------ numberExpiditedDevUnits.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});

test("20 devUnits, 2 touchSteps, factor 0.5", () /*: void */ => {
  globalSettings();
  globalState();
  gSttngs().set("devUnits", 20);
  gSttngs().set("expdtdDvUnitsFactor", 0.5);
  const nmExpdtdDvUnts = numberExpiditedDevUnits();
  should(nmExpdtdDvUnts).be.exactly(5);
});

test("5 devUnits, 2 touchSteps(), factor 0.5", () /*: void */ => {
  globalSettings();
  globalState();
  gSttngs().set("devUnits", 5);
  gSttngs().set("expdtdDvUnitsFactor", 0.5);
  const nmExpdtdDvUnts = numberExpiditedDevUnits();
  should(nmExpdtdDvUnts).be.exactly(1);
});
