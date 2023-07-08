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
import newFlwItem from "./newFlwItem.js";
import newClickCube from "./newClickCube.js";
//------------------------------------------------------------------
// IMPORT: FUNCTION UNDER TEST
//------------------------------------------------------------------
import inTouch from "./inTouch.js";
//------------------------------------------------------------------
// TEST: inTouch()
//------------------------------------------------------------------
test("------- inTouch.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});

const fixture = () /*: FlwItem */ => {
  globalSettings();
  globalState();
  gState().set("clckCbGroup", newClickCube());
  const flwItem = newFlwItem();
  return flwItem;
};

test("Returns true when the flwItem is in a touch status", () /*: void */ => {
  const flwItem = fixture();
  flwItem.dStpIndex = 2;
  const result = inTouch(flwItem, 0);
  should(result).be.true();
});

test("Returns false when the flwItem is in a wait status", () /*: void */ => {
  const flwItem = fixture();
  flwItem.dStpIndex = 3;
  const result = inTouch(flwItem, 0);
  should(result).be.false();
});
