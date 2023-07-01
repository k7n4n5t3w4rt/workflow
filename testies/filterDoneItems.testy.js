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
test("------- filterOutDoneItems.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});

const fixture = (stepLength /*: number */) /*: FlwItem */ => {
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
  const doneFlwItems = [];
  for (let i = 0; i < stepLength; i++) {
    doneFlwItems[i] = newFlwItem(5);
    doneFlwItems[i].dExpedite = false;
    doneFlwItems[i].dAge = 10;
    doneFlwItems[i].dVolume = 10;
  }
  return doneFlwItems;
};

const tearDown = () /*: void */ => {
  gState().get("thrPtQueue").dequeue();
  gState().get("vQueue").dequeue();
  gState().get("flwTmQueue").dequeue();
};

test("Filters out Done flwItems...", () /*: void */ => {
  gSttngs().set("expdtQueueLength", 0);
  gSttngs().set("expdtDvUnitsFactor", 0);
  const doneFlwItems = fixture(3);
  doneFlwItems[0].dExpedite = false;
  doneFlwItems[1].dExpedite = false;
  doneFlwItems[2].dExpedite = false;
  filterDoneItems(removeDoneFlwItmsFromFlwMap)();
  should(gState().get("flwMap")["5"].length).be.exactly(0);
  tearDown();
});

test("Updates the thoughput queue", () /*: void */ => {
  gSttngs().set("expdtQueueLength", 0);
  gSttngs().set("expdtDvUnitsFactor", 0);
  const doneFlwItems = fixture(3);
  doneFlwItems[0].dExpedite = false;
  doneFlwItems[1].dExpedite = false;
  doneFlwItems[2].dExpedite = false;
  filterDoneItems(removeDoneFlwItmsFromFlwMap)();
  should(gState().get("thrPtQueue").length()).be.exactly(1);
  should(JSON.stringify(gState().get("thrPtQueue").items[0])).be.exactly(
    JSON.stringify([3]),
  );
  tearDown();
});

test("Updates the expedite thoughput queue", () /*: void */ => {
  gSttngs().set("expdtQueueLength", 0);
  gSttngs().set("expdtDvUnitsFactor", 0);
  const doneFlwItems = fixture(3);
  gSttngs().set("expdtQueueLength", 1);
  gSttngs().set("expdtDvUnitsFactor", 1);
  doneFlwItems[0].dExpedite = true;
  doneFlwItems[1].dExpedite = true;
  doneFlwItems[2].dExpedite = true;
  filterDoneItems(removeDoneFlwItmsFromFlwMap)();
  should(gState().get("thrPtExpQueue").length()).be.exactly(1);
  should(JSON.stringify(gState().get("thrPtExpQueue").items[0])).be.exactly(
    JSON.stringify([3]),
  );
  tearDown();
});

test("Updates the value queue", () /*: void */ => {
  gSttngs().set("expdtQueueLength", 0);
  gSttngs().set("expdtDvUnitsFactor", 0);
  const doneFlwItems = fixture(3);
  gSttngs().set("expdtQueueLength", 1);
  gSttngs().set("expdtDvUnitsFactor", 1);
  doneFlwItems[0].dExpedite = false;
  doneFlwItems[1].dExpedite = false;
  doneFlwItems[2].dExpedite = true;
  filterDoneItems(removeDoneFlwItmsFromFlwMap)();
  should(gState().get("vQueue").length()).be.exactly(1);
  should(gState().get("vQueue").total()).be.exactly(30);
  should(gState().get("vQueue").dailyMean()).be.exactly(30);
  should(gState().get("vQueue").flwItemMean()).be.exactly(10);
  // Another click
  const doneFlwItems2 = [];
  for (let i = 0; i <= 2; i++) {
    doneFlwItems2[i] = newFlwItem(5);
    doneFlwItems2[i].dExpedite = false;
    doneFlwItems2[i].dAge = 10;
    doneFlwItems2[i].dVolume = 10;
  }
  gSttngs().set("expdtQueueLength", 1);
  gSttngs().set("expdtDvUnitsFactor", 1);
  doneFlwItems2[0].dExpedite = false;
  doneFlwItems2[1].dExpedite = false;
  doneFlwItems2[2].dExpedite = true;
  filterDoneItems(removeDoneFlwItmsFromFlwMap)();
  should(gState().get("vQueue").length()).be.exactly(2);
  should(gState().get("vQueue").total()).be.exactly(60);
  should(gState().get("vQueue").dailyMean()).be.exactly(30);
  should(gState().get("vQueue").flwItemMean()).be.exactly(10);
  tearDown();
});

test("Updates the flow time queue", () /*: void */ => {
  gSttngs().set("expdtQueueLength", 0);
  gSttngs().set("expdtDvUnitsFactor", 0);
  const doneFlwItems = fixture(3);
  gSttngs().set("expdtQueueLength", 1);
  gSttngs().set("expdtDvUnitsFactor", 1);
  doneFlwItems[0].dExpedite = false;
  doneFlwItems[1].dExpedite = false;
  doneFlwItems[2].dExpedite = false;
  filterDoneItems(removeDoneFlwItmsFromFlwMap)();
  // Another click
  const doneFlwItems2 = [];
  for (let i = 0; i <= 2; i++) {
    doneFlwItems2[i] = newFlwItem(5);
    doneFlwItems2[i].dExpedite = false;
    doneFlwItems2[i].dAge = 10;
    doneFlwItems2[i].dVolume = 10;
  }
  // Only one item is normal
  doneFlwItems2[0].dExpedite = false;
  doneFlwItems2[1].dExpedite = true;
  doneFlwItems2[2].dExpedite = true;
  filterDoneItems(removeDoneFlwItmsFromFlwMap)();
  should(gState().get("flwTmQueue").length()).be.exactly(2);
  should(gState().get("flwTmQueue").total()).be.exactly(40);
  should(JSON.stringify(gState().get("flwTmQueue").items[0])).be.exactly(
    JSON.stringify([10, 10, 10]),
  );
  should(JSON.stringify(gState().get("flwTmQueue").items[1])).be.exactly(
    JSON.stringify([10]),
  );
  should(gState().get("flwTmQueue").flwItemMean()).be.exactly(10);
  should(gState().get("flwTmQueue").dailyMean()).be.exactly(20);
  tearDown();
});

test("Counts expedited flwItems as normal when the expedite queue is not active", () /*: void */ => {
  gSttngs().set("expdtQueueLength", 0);
  gSttngs().set("expdtDvUnitsFactor", 0);
  const doneFlwItems = fixture(3);
  doneFlwItems[0].dExpedite = false;
  doneFlwItems[1].dExpedite = false;
  doneFlwItems[2].dExpedite = false;
  filterDoneItems(removeDoneFlwItmsFromFlwMap)();
  // Another click
  const doneFlwItems2 = [];
  for (let i = 0; i <= 2; i++) {
    doneFlwItems2[i] = newFlwItem(5);
    doneFlwItems2[i].dExpedite = false;
    doneFlwItems2[i].dAge = 10;
    doneFlwItems2[i].dVolume = 10;
  }
  // Only one item is normal
  doneFlwItems2[0].dExpedite = false;
  doneFlwItems2[1].dExpedite = true;
  doneFlwItems2[2].dExpedite = true;
  filterDoneItems(removeDoneFlwItmsFromFlwMap)();
  should(gState().get("flwTmQueue").length()).be.exactly(2);
  should(gState().get("flwTmQueue").total()).be.exactly(60);
  should(JSON.stringify(gState().get("flwTmQueue").items[0])).be.exactly(
    JSON.stringify([10, 10, 10]),
  );
  should(JSON.stringify(gState().get("flwTmQueue").items[1])).be.exactly(
    JSON.stringify([10, 10, 10]),
  );
  should(gState().get("flwTmQueue").flwItemMean()).be.exactly(10);
  should(gState().get("flwTmQueue").dailyMean()).be.exactly(30);
  tearDown();
});

test("Updates the expedite flow time queue", () /*: void */ => {
  const doneFlwItems = fixture(1);
  gSttngs().set("expdtQueueLength", 1);
  gSttngs().set("expdtDvUnitsFactor", 1);
  // Check it is empty to start with
  doneFlwItems[0].dExpedite = true;
  filterDoneItems(removeDoneFlwItmsFromFlwMap)();
  should(gState().get("flwTmExpQueue").length()).be.exactly(1);
  should(gState().get("flwTmExpQueue").total()).be.exactly(10);
  should(JSON.stringify(gState().get("flwTmExpQueue").items[0])).be.exactly(
    JSON.stringify([10]),
  );
  should(gState().get("flwTmExpQueue").flwItemMean()).be.exactly(10);
  should(gState().get("flwTmExpQueue").dailyMean()).be.exactly(10);
  tearDown();
});
