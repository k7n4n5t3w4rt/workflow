// @flow
//------------------------------------------------------------------
// IMPORT: TESTY
//------------------------------------------------------------------
import { test, testPromise, should } from "../server/testy.js";
//------------------------------------------------------------------
// IMPORT: FUNCTION UNDER TEST
//------------------------------------------------------------------
import skipForWip from "../js/workflow/actions/skipForWip.js";
// //------------------------------------------------------------------
// // IMPORT: GLOBALS
// //------------------------------------------------------------------
// import gSttngs from "../js/workflow/actions/gSttngs.js";
// import gState from "../js/workflow/actions/gState.js";
// //------------------------------------------------------------------
// // IMPORT: SETTINGS/STATE
// //------------------------------------------------------------------
// import globalSettings from "../js/workflow/actions/globalSettings.js";
// import globalState from "../js/workflow/actions/globalState.js";
// globalSettings({});
// globalState();

test("-------------- skipForWip.js ---------------------", () /*: void */ => {
  should(1).be.exactly(1);
});

test("Returns true if wip is 0", () /*: void */ => {
  const devUnits = 5;
  const wip = 0;
  const skip = skipForWip(devUnits, wip);
  should(skip).be.true();
});

test("Returns true if devUnits is 0", () /*: void */ => {
  const devUnits = 0;
  const wip = 10;
  const skip = skipForWip(devUnits, wip);
  should(skip).be.true();
});

test("Returns false if devUnits is 10 and wip is 1", () /*: void */ => {
  const devUnits = 10;
  const wip = 1;
  const skip = skipForWip(devUnits, wip);
  should(skip).be.false();
});

test("Returns false if devUnits is 10 and wip is 10", () /*: void */ => {
  const devUnits = 10;
  const wip = 10;
  const skip = skipForWip(devUnits, wip);
  should(skip).be.false();
});
