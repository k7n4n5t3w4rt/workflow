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
import newClickCube from "../js/workflow/actions/newClickCube.js";
import newFlwItem from "../js/workflow/actions/newFlwItem.js";
//------------------------------------------------------------------
// IMPORT: FUNCTION UNDER TEST
//------------------------------------------------------------------
import expediteAndNormalFlwItems from "../js/workflow/calculations/expediteAndNormalFlwItems.js";
//------------------------------------------------------------------
// TEST: numberExpiditedDevUnits()
//------------------------------------------------------------------
test("--------- expediteAndNormalFlwItems.js ----------", () /*: void */ => {
  should(1).be.exactly(1);
});

const fixture = () /*: Array<FlwItem> */ => {
  globalSettings();
  globalState();
  gState().set("clckCbGroup", newClickCube());
  const flwItems = [];
  flwItems.push(newFlwItem());
  flwItems.push(newFlwItem());
  flwItems.push(newFlwItem());
  flwItems.push(newFlwItem());
  return flwItems;
};

test("Passing an empty array", () /*: void */ => {
  const flwItems = [];
  const { expdtFlwItems, normalFlwItems } = expediteAndNormalFlwItems(flwItems);
  should(expdtFlwItems.length).be.exactly(0);
  should(normalFlwItems.length).be.exactly(0);
});

test("Out of 4 flwItems, 2 are expedite", () /*: void */ => {
  const flwItems = fixture();
  flwItems[0].dExpedite = true;
  flwItems[2].dExpedite = true;
  const { expdtFlwItems, normalFlwItems } = expediteAndNormalFlwItems(flwItems);
  should(expdtFlwItems.length).be.exactly(2);
  should(normalFlwItems.length).be.exactly(2);
});
