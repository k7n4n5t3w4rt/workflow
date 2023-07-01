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
import calculateRange from "../js/workflow/actions/calculateRange.js";
//------------------------------------------------------------------
// TEST: dragFunction
//------------------------------------------------------------------
test("------- calculateRange.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});

const fixture = () /*: void */ => {
  // Settings
  globalSettings();
  gSttngs().set("steps", [
    { name: "Open", status: "backlog", limit: 0, preload: 3 },
    { name: "Ready", status: "wait", limit: 3, preload: 3 },
    { name: "Doing", status: "touch", limit: 3, preload: 3 },
    { name: "Ready for Test", status: "wait", limit: 3, preload: 3 },
    { name: "In Test", status: "touch", limit: 3, preload: 3 },
    { name: "Done", status: "done", limit: 0 },
  ]);
  gSttngs().set("rangeIncreaseRate", 1.75);
  gSttngs().set("rangeDecreaseRate", 0.75);
  gSttngs().set("scale", 0.1);
  gSttngs().set("yOffset", gSttngs().get("scale") * 10);
  gSttngs().set("rangeMax", gSttngs().get("yOffset") * 0.75);
  // State
  globalState();
  gState().set("clckCbGroup", newClickCube());
  populateSteps();
};

test("Calculates a sensible but, really, entirely arbitrary range", () /*: void */ => {
  fixture();
  const range = calculateRange(0);
  should(range).be.exactly(0.39);
});
