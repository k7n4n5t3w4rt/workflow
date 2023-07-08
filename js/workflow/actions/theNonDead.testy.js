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
import populateSteps from "./populateSteps.js";
//------------------------------------------------------------------
// IMPORT: FUNCTION UNDER TEST
//------------------------------------------------------------------
import theNonDead from "./theNonDead.js";
//------------------------------------------------------------------
// MOCKS
//------------------------------------------------------------------
const removeFlowItem = (flwItem /*: FlwItem */) /*: void */ => {};
const removeDoneFlwItmsFromFlwMap = (
  _ /*: null | void */,
  flwItem /*: FlwItem */,
  index /*: number */,
) /*: void */ => {};
//------------------------------------------------------------------
// TEST: theNonDead()
//------------------------------------------------------------------
test("------- theNonDead.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});
const fixture = () /*: void */ => {
  globalSettings();
  globalState();
  gState().set("clckCbGroup", newClickCube());
};

test("Filters out flwItems that are dead.", () /*: void */ => {
  fixture();
  gSttngs().set("death", 10);
  // Set the dAge - 2 below and w above the death threshold
  const flwItem = newFlwItem();
  flwItem.dAge = 10;
  const result = theNonDead(removeFlowItem, removeDoneFlwItmsFromFlwMap)(
    flwItem,
    0,
  );
  should(result).be.false();
});

test("Doesn't filter out flwItems that are alive.", () /*: void */ => {
  gSttngs().set("death", 10);
  // Set the dAge - 2 below and w above the death threshold
  const flwItem = newFlwItem();
  flwItem.dAge = 8;
  should(
    theNonDead(removeFlowItem, removeDoneFlwItmsFromFlwMap)(flwItem, 0),
  ).be.true();
});
