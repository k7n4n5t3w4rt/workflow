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
import populateSteps from "../js/workflow/actions/populateSteps.js";
import newFlwItem from "../js/workflow/actions/newFlwItem.js";
//------------------------------------------------------------------
// IMPORT: FUNCTION UNDER TEST
//------------------------------------------------------------------
import filterDoneItems from "../js/workflow/actions/filterDoneItems.js";
//------------------------------------------------------------------
// MOCKS
//------------------------------------------------------------------
const removeDoneFlwItmsFromFlwMap = (
  _ /*: null | void */,
  flwItem /*: FlwItem */,
  index /*: number */,
) /*: void */ => {
  // There is a lot of stuff missing here
  // ...
  // This is the bit we need for the test
  const deletedFlwItem = gState()
    .get("flwMap")
    [flwItem.dStpIndex.toString()].splice(index, 1);
};
//------------------------------------------------------------------
// TEST: filterOutDoneItems()
//------------------------------------------------------------------
test("-------------- filterOutDoneItems.js ---------------------", () /*: void */ => {
  should(1).be.exactly(1);
});

const fixture = () /*: FlwItem */ => {
  globalSettings();
  gSttngs().set("steps", [
    { name: "Open", status: "backlog", limit: 0, preload: 3 },
    { name: "Ready", status: "wait", limit: 3, preload: 3 },
    { name: "Doing", status: "touch", limit: 3, preload: 3 },
    { name: "Ready for Test", status: "wait", limit: 3, preload: 3 },
    { name: "In Test", status: "touch", limit: 3, preload: 3 },
    { name: "Done", status: "done", limit: 0 },
  ]);
  globalState();
  // Needed for newFlwItem(5) and populateSteps()
  gState().set("clckCbGroup", newClickCube());
  populateSteps();
  const doneFlwItem = newFlwItem(5);
  doneFlwItem.dExpedite = false;
  doneFlwItem.dAge = 10;
  doneFlwItem.dVolume = 10;
  return doneFlwItem;
};

const tearDown = () /*: void */ => {
  gState().get("thrPtQueue").dequeue();
  gState().get("vQueue").dequeue();
  gState().get("flwTmQueue").dequeue();
};

test("Filters out a Done flwItem...", () /*: void */ => {
  fixture();
  filterDoneItems(removeDoneFlwItmsFromFlwMap)();
  should(gState().get("flwMap")["5"].length).be.exactly(0);
  tearDown();
});

test("...and updates the thoughput queue", () /*: void */ => {
  // Check it is empty to start with
  fixture();
  const flwItem = fixture();
  should(gState().get("thrPtQueue").length()).be.exactly(0);
  filterDoneItems(removeDoneFlwItmsFromFlwMap)();
  should(gState().get("thrPtQueue").length()).be.exactly(1);
  tearDown();
});

test("...and updates the value queue", () /*: void */ => {
  // Check it is empty to start with
  fixture();
  const flwItem = fixture();
  should(gState().get("vQueue").length()).be.exactly(0);
  should(gState().get("vQueue").total()).be.exactly(0);
  filterDoneItems(removeDoneFlwItmsFromFlwMap)();
  should(gState().get("vQueue").length()).be.exactly(1);
  should(gState().get("vQueue").total()).be.exactly(10);
  tearDown();
});

test("...and updates the thoughput queue", () /*: void */ => {
  // Check it is empty to start with
  fixture();
  const flwItem = fixture();
  should(gState().get("thrPtQueue").length()).be.exactly(0);
  filterDoneItems(removeDoneFlwItmsFromFlwMap)();
  should(gState().get("thrPtQueue").length()).be.exactly(1);
  tearDown();
});

test("...and updates the expedite thoughput queue", () /*: void */ => {
  // Check it is empty to start with
  const flwItem = fixture();
  flwItem.dExpedite = true;
  should(gState().get("thrPtQueue").length()).be.exactly(0);
  fixture();
  filterDoneItems(removeDoneFlwItmsFromFlwMap)();
  should(gState().get("thrPtExpQueue").length()).be.exactly(1);
  tearDown();
});

test("...and updates the flow time queue", () /*: void */ => {
  // Check it is empty to start with
  const flwItem = fixture();
  should(gState().get("flwTmQueue").length()).be.exactly(0);
  should(gState().get("flwTmQueue").total()).be.exactly(0);
  filterDoneItems(removeDoneFlwItmsFromFlwMap)();
  should(gState().get("flwTmQueue").length()).be.exactly(1);
  should(gState().get("flwTmQueue").total()).be.exactly(10);
  tearDown();
});

test("...and updates the expedite flow time queue", () /*: void */ => {
  // Check it is empty to start with
  const flwItem = fixture();
  flwItem.dExpedite = true;
  should(gState().get("flwTmExpQueue").length()).be.exactly(0);
  should(gState().get("flwTmExpQueue").total()).be.exactly(0);
  filterDoneItems(removeDoneFlwItmsFromFlwMap)();
  should(gState().get("flwTmExpQueue").length()).be.exactly(1);
  should(gState().get("flwTmExpQueue").total()).be.exactly(10);
  tearDown();
});
