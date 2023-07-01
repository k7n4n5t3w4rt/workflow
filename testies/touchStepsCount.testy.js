// @flow
//------------------------------------------------------------------
// IMPORT: TESTY
//------------------------------------------------------------------
import { test, testPromise, should } from "../server/testy.js";
//------------------------------------------------------------------
// IMPORT: FUNCTION UNDER TEST
//------------------------------------------------------------------
import touchStepsCount from "../js/workflow/actions/touchStepsCount.js";
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../js/workflow/actions/gSttngs.js";
//------------------------------------------------------------------
// IMPORT: SETTINGS/STATE
//------------------------------------------------------------------
import globalSettings from "../js/workflow/actions/globalSettings.js";

//------------------------------------------------------------------
// VALUES
//------------------------------------------------------------------
test("------- touchStepsCount.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});

test("Returns the correct number of touchSteps.", () /*: void */ => {
  globalSettings();
  gSttngs().set("steps", [
    { name: "Open", status: "backlog", limit: 0, preload: 3 },
    { name: "Ready", status: "wait", limit: 3, preload: 3 },
    { name: "Doing", status: "touch", limit: 3, preload: 3 },
    { name: "Ready for Test", status: "wait", limit: 3, preload: 3 },
    { name: "In Test", status: "touch", limit: 3, preload: 3 },
    { name: "Done", status: "done", limit: 0 },
  ]);
  const touchStepsNum = touchStepsCount();
  should(touchStepsNum).be.exactly(2);
});
