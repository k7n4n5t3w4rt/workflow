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
