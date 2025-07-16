// @flow
//------------------------------------------------------------------
// IMPORT: TESTY
//------------------------------------------------------------------
import { should, test } from "../server/testy.js";
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../js/flwAttrctr/actions/gSttngs.js";
import gState from "../js/flwAttrctr/actions/gState.js";
//------------------------------------------------------------------
// IMPORT: SETTINGS/STATE
//------------------------------------------------------------------
import globalSettings from "../js/flwattrctr/actions/globalSettings.js";
import globalState from "../js/flwattrctr/actions/globalState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import populateStepsHeadless from "../js/flwAttrctr/actions/populateStepsHeadless.js";
//------------------------------------------------------------------
// IMPORT: FUNCTION UNDER TEST
//------------------------------------------------------------------
import { headlessClickLoop } from "../js/flwAttrctr/actions/headlessClickLoop.js";

//------------------------------------------------------------------
// TEST: headlessClickLoop
//------------------------------------------------------------------
test("------- headlessClickLoop.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});
const fixture = () /*: void */ => {
  globalSettings();
  // So there are 2 touch steps
  gSttngs().set("steps", [
    {
      name: "Open",
      status: "backlog",
      limit: 10,
      movingLimit: 10,
      avAge: 0,
      devUnits: 0,
      flwTimeAtStart: 0,
      actualFlwTime: 0,
      movingDevUnits: 0,
    },
    {
      name: "Ready",
      status: "wait",
      limit: 2,
      movingLimit: 2,
      avAge: 1,
      devUnits: 0,
      flwTimeAtStart: 0,
      actualFlwTime: 0,
      movingDevUnits: 0,
    },
    {
      name: "Doing",
      status: "touch",
      limit: 2,
      movingLimit: 2,
      avAge: 1,
      devUnits: 2,
      flwTimeAtStart: 1,
      actualFlwTime: 1,
      movingDevUnits: 2,
    },
    {
      name: "Ready for Test",
      status: "wait",
      limit: 2,
      movingLimit: 2,
      avAge: 1,
      devUnits: 0,
      flwTimeAtStart: 0,
      actualFlwTime: 0,
      movingDevUnits: 0,
    },
    {
      name: "In Test",
      status: "touch",
      limit: 2,
      movingLimit: 2,
      avAge: 1,
      devUnits: 2,
      flwTimeAtStart: 1,
      actualFlwTime: 1,
      movingDevUnits: 2,
    },
    {
      name: "Done",
      status: "done",
      limit: 0,
      movingLimit: 0,
      avAge: 0,
      devUnits: 0,
      flwTimeAtStart: 0,
      actualFlwTime: 0,
      movingDevUnits: 0,
    },
  ]);
  gSttngs().set("timeBox", 10);
  gSttngs().set("arrivalRate", 1);
  gSttngs().set("flwTimeMin", 3);
  gSttngs().set("x", 1);
  gSttngs().set("y", 1);
  gSttngs().set("z", 1);
  gSttngs().set("drag", 0);
  gSttngs().set("dragPoint", 0);
  globalState();
  gState().set("uuid", 0);
  console.log(
    "headlessClickLoop.testy.js: fixture() - Just about to call populateStepsHeadless()",
  );
  populateStepsHeadless();
  console.log(
    "headlessClickLoop.testy.js: fixture() - Just called populateStepsHeadless()",
  );
};

test("headlessClickLoop() returns a flow time number", async () => {
  fixture();
  console.log(
    "headlessClickLoop.testy.js: test() - Just about to call headlessClickLoop()",
  );
  const flwTime = headlessClickLoop(10, []);
  console.log("headlessClickLoop() flwTime:", flwTime);
  should(Array.isArray(flwTime)).be.true;
  should(flwTime.length).be.exactly(10);
});
