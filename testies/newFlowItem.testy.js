// @flow
//------------------------------------------------------------------
// IMPORT: TESTY
//------------------------------------------------------------------
import { test, testPromise, should } from "../server/testy.js";
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../js/flwattrctr/actions/gSttngs.js";
import gState from "../js/flwattrctr/actions/gState.js";
//------------------------------------------------------------------
// IMPORT: SETTINGS/STATE
//------------------------------------------------------------------
import globalSettings from "../js/flwattrctr/actions/globalSettings.js";
import globalState from "../js/flwattrctr/actions/globalState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import newClickCube from "../js/flwattrctr/actions/newClickCube.js";
//------------------------------------------------------------------
// IMPORT: FUNCTION UNDER TEST
//------------------------------------------------------------------
import newFlwItem from "../js/flwattrctr/actions/newFlwItem.js";
//------------------------------------------------------------------
// TEST: newFlwItem
//------------------------------------------------------------------
test("------- newFlwItem.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});

const fixture = () /*: FlwItem */ => {
  globalSettings();
  globalState();
  gState().set("clckCbGroup", newClickCube());
  return newFlwItem();
};

test("Adds a flwItem to the flwMap.", () /*: void */ => {
  fixture();
  should(gState().get("flwMap")["0"].length).be.exactly(1);
});
