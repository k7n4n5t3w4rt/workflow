// @flow
//------------------------------------------------------------------
// IMPORT: TESTY
//------------------------------------------------------------------
import { test, should } from "../server/testy.js";
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../js/flwAttrctr/actions/gSttngs.js";
import gState from "../js/flwAttrctr/actions/gState.js";
//------------------------------------------------------------------
// IMPORT: SETTINGS/STATE
//------------------------------------------------------------------
import globalSettings from "../js/flwAttrctr/actions/globalSettings.js";
import globalState from "../js/flwAttrctr/actions/globalState.js";
//------------------------------------------------------------------
// IMPORT: FUNCTION UNDER TEST
//------------------------------------------------------------------
import calculateTotalWip from "../js/flwAttrctr/actions/calculateTotalWip.js";

//------------------------------------------------------------------
// TEST: calculateTotalWip()
//------------------------------------------------------------------
test("------- calculateTotalWip.js -------", () => {
  const fixture = () => {
    globalSettings();
    gSttngs().set("steps", [
      { name: "Open", status: "backlog", limit: 0 },
      { name: "Ready", status: "wait", limit: 3 },
      { name: "Doing", status: "touch", limit: 3 },
      { name: "Ready for Test", status: "wait", limit: 3 },
      { name: "In Test", status: "touch", limit: 3 },
      { name: "Done", status: "done", limit: 0 },
    ]);
    globalState();
    gState().set("flwMap", {
      "0": [],
      "1": [{}, {}],
      "2": [{}, {}, {}],
      "3": [{}],
      "4": [{}, {}],
      "5": [],
    });
  };

  fixture();
  const totalWip = calculateTotalWip();
  should(totalWip).be.exactly(8);
});
