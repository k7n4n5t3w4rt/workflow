// @flow
//------------------------------------------------------------------
// IMPORT: TESTY
//------------------------------------------------------------------
import { should, test } from "../server/testy.js";
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../js/flwAttrctr/actions/gSttngs.js";
//------------------------------------------------------------------
// IMPORT: SETTINGS/STATE
//------------------------------------------------------------------
import globalSettings from "../js/flwattrctr/actions/globalSettings.js";
import globalState from "../js/flwattrctr/actions/globalState.js";
//------------------------------------------------------------------
// IMPORT: FUNCTION UNDER TEST
//------------------------------------------------------------------
import { headlessClickLoop } from "../js/flwAttrctr/actions/click.js";

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
      limit: 0,
      movingLimit: 0,
      avAge: 0,
      devUnits: 0,
      flwTimeAtStart: 0,
      actualFlwTime: 0,
      movingDevUnits: 0,
    },
    {
      name: "Ready",
      status: "wait",
      limit: 3,
      movingLimit: 3,
      avAge: 0,
      devUnits: 0,
      flwTimeAtStart: 0,
      actualFlwTime: 0,
      movingDevUnits: 0,
    },
    {
      name: "Doing",
      status: "touch",
      limit: 3,
      movingLimit: 3,
      avAge: 0,
      devUnits: 0,
      flwTimeAtStart: 0,
      actualFlwTime: 0,
      movingDevUnits: 0,
    },
    {
      name: "Ready for Test",
      status: "wait",
      limit: 3,
      movingLimit: 3,
      avAge: 0,
      devUnits: 0,
      flwTimeAtStart: 0,
      actualFlwTime: 0,
      movingDevUnits: 0,
    },
    {
      name: "In Test",
      status: "touch",
      limit: 3,
      movingLimit: 3,
      avAge: 0,
      devUnits: 0,
      flwTimeAtStart: 0,
      actualFlwTime: 0,
      movingDevUnits: 0,
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
  globalState();
};
test("headlessClickLoop()", async () => {
  fixture();
  const data = headlessClickLoop();
  should(Array.isArray(data)).be.true();
  should(data.length).be.greaterThan(0);
});
