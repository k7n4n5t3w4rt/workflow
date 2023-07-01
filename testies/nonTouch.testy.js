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
// MOCKS
//------------------------------------------------------------------
const removeFlowItem = (
  flwItem /*: FlwItem */,
  index /*: number */,
) /*: void */ => {};
//------------------------------------------------------------------
// TEST: inTouch()
//------------------------------------------------------------------
test("------- inTouch.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});
const fixture = () /*: FlwItem[] */ => {
  globalSettings();
  globalState();
  gState().set("clckCbGroup", newClickCube());
  const flwItems = [];
  flwItems.push(newFlwItem(0));
  flwItems.push(newFlwItem(1));
  flwItems.push(newFlwItem(2)); // "touch"
  flwItems.push(newFlwItem(3));
  flwItems.push(newFlwItem(4)); // "touch"
  flwItems.push(newFlwItem(5));
  return flwItems;
};

test("Filters out flwItems that are not in a touch step.", () /*: void */ => {
  const flwItems = fixture();
  const result = flwItems.filter(inTouch);
  should(result.length).be.exactly(2);
});
