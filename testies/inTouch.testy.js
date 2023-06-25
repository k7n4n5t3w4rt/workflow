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
import newFlwItem from "../js/workflow/actions/newFlwItem.js";
import newClickCube from "../js/workflow/actions/newClickCube.js";
//------------------------------------------------------------------
// IMPORT: FUNCTION UNDER TEST
//------------------------------------------------------------------
import inTouch from "../js/workflow/actions/inTouch.js";
//------------------------------------------------------------------
// TEST: inTouch()
//------------------------------------------------------------------
test("-------------- inTouch.js ---------------------", () /*: void */ => {
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
