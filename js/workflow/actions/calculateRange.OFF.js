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
import newClickCube from "./newClickCube.js";
import populateSteps from "./populateSteps.js";
//------------------------------------------------------------------
// IMPORT: FUNCTION UNDER TEST
//------------------------------------------------------------------
import calculateRange from "./calculateRange.js";
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
  gSttngs().set("rangeMidpoint", 0.75);
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
