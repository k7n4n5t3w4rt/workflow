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
import { numberExpiditedDevUnits } from "../js/flwattrctr/actions/numberDevUnits.js";
//------------------------------------------------------------------
// TEST: dragFunction
//------------------------------------------------------------------
test("------ numberExpiditedDevUnits.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});

const fixture = () /*: void */ => {
  globalSettings();
  globalState();
  gSttngs().set("expdtDvUnitsFactor", 1);
  gSttngs().set("expdtQueueLength", 1);
};

test("20 devUnits, 2 touchSteps, factor 0.5", () /*: void */ => {
  fixture();
  gSttngs().set("devUnits", 20);
  gSttngs().set("expdtDvUnitsFactor", 0.5);
  const nmExpdtDvUnts = numberExpiditedDevUnits();
  should(nmExpdtDvUnts).be.exactly(5);
});

test("5 devUnits, 2 touchSteps(), factor 0.5", () /*: void */ => {
  fixture();
  gSttngs().set("devUnits", 5);
  gSttngs().set("expdtDvUnitsFactor", 0.5);
  const nmExpdtDvUnts = numberExpiditedDevUnits();
  should(nmExpdtDvUnts).be.exactly(1.25);
});
