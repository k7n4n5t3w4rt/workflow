// @flow
//------------------------------------------------------------------
// IMPORT: TESTY
//------------------------------------------------------------------
import { test, testPromise, should } from "../../../server/testy.js";
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: SETTINGS/STATE
//------------------------------------------------------------------
import globalSettings from "./globalSettings.js";
import globalState from "./globalState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import newClickCube from "./newClickCube.js";
//------------------------------------------------------------------
// IMPORT: FUNCTION UNDER TEST
//------------------------------------------------------------------
import newFlwItem from "./newFlwItem.js";
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
