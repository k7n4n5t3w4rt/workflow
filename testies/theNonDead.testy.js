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
import populateSteps from "../js/workflow/actions/populateSteps.js";
//------------------------------------------------------------------
// IMPORT: FUNCTION UNDER TEST
//------------------------------------------------------------------
import theNonDead from "../js/workflow/actions/theNonDead.js";
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
