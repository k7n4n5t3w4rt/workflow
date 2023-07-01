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
import newClickCube from "../js/workflow/actions/newClickCube.js";
import populateSteps from "../js/workflow/actions/populateSteps.js";
//------------------------------------------------------------------
// IMPORT: FUNCTION UNDER TEST
//------------------------------------------------------------------
//------------------------------------------------------------------
// TEST: setExpedite()
//------------------------------------------------------------------
test("------- setExpedite.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});

const fixture = () /*: void */ => {
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
  gState().set("clckCbGroup", newClickCube());
  populateSteps();
};

test("Returns...", () /*: void */ => {
  const flwItems = fixture();
  // ...
  should(false).be.false();
});
