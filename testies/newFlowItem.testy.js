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
//------------------------------------------------------------------
// IMPORT: FUNCTION UNDER TEST
//------------------------------------------------------------------
import newFlwItem from "../js/workflow/actions/newFlwItem.js";
//------------------------------------------------------------------
// TEST: newFlwItem
//------------------------------------------------------------------
test("-------------- newFlwItem.js ---------------------", () /*: void */ => {
  should(1).be.exactly(1);
});

const fixture = () /*: FlwItem */ => {
  globalSettings({});
  globalState();
  gState().clckCbGroup = newClickCube();
  return newFlwItem();
};

test("Adds a flwItem to the flwMap.", () /*: void */ => {
  fixture();
  should(gState().flwMap["0"].length).be.exactly(1);
});