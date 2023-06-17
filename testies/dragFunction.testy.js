// @flow
//------------------------------------------------------------------
// IMPORT: TESTY
//------------------------------------------------------------------
import { test, testPromise, should } from "../server/testy.js";
//------------------------------------------------------------------
// IMPORT: FUNCTION UNDER TEST
//------------------------------------------------------------------
import dragFunction from "../js/workflow/actions/dragFunction.js";
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

//------------------------------------------------------------------
// VALUES
//------------------------------------------------------------------
test("-------------- dragFunction.js ---------------------", () /*: void */ => {
  should(1).be.exactly(1);
});

test("Returns 0.01 if wip is 20:1 and drag is 0.8", () /*: void */ => {
  const devDays = 5;
  const wip = 100;
  const drag = 0.8;
  const newDrag = dragFunction(devDays, wip, drag);
  should(newDrag).be.exactly(0.01);
});

test("Returns 0.1 if wip is 2:1 and drag is 0.8", () /*: void */ => {
  const devDays = 5;
  const wip = 10;
  const drag = 0.8;
  const newDrag = dragFunction(devDays, wip, drag);
  should(newDrag).be.exactly(0.1);
});

test("Returns 0.4 if wip is 2:1 and drag is 0.2", () /*: void */ => {
  const devDays = 5;
  const wip = 10;
  const drag = 0.2;
  const newDrag = dragFunction(devDays, wip, drag);
  should(newDrag).be.exactly(0.4);
});

test("Returns 0.25 if wip is 2:1 and drag is 0.5", () /*: void */ => {
  const devDays = 5;
  const wip = 10;
  const drag = 0.5;
  const newDrag = dragFunction(devDays, wip, drag);
  should(newDrag).be.exactly(0.25);
});

test("Returns 0.33 if wip is 3:1 and drag is 0", () /*: void */ => {
  const devDays = 5;
  const wip = 15;
  const drag = 0;
  const newDrag = dragFunction(devDays, wip, drag);
  should(newDrag).be.exactly(0.33);
});

test("Returns 0.5 if wip is 2:1 and drag is 0", () /*: void */ => {
  const devDays = 5;
  const wip = 10;
  const drag = 0;
  const newDrag = dragFunction(devDays, wip, drag);
  should(newDrag).be.exactly(0.5);
});

//------------------------------------------------------------------
// EDGE CASES
//------------------------------------------------------------------
test("Returns zero if wip is zero", () /*: void */ => {
  const devDays = 7;
  const wip = 0;
  const drag = 0.25;
  const newDrag = dragFunction(devDays, wip, drag);
  should(newDrag).be.exactly(0);
});

test("Returns zero if devDays is zero", () /*: void */ => {
  const devDays = 0;
  const wip = 10;
  const drag = 0.25;
  const newDrag = dragFunction(devDays, wip, drag);
  should(newDrag).be.exactly(0);
});

test("Returns just devDays/wip if drag is zero", () /*: void */ => {
  const devDays = 7;
  const wip = 10;
  const drag = 0;
  const newDrag = dragFunction(devDays, wip, drag);
  should(newDrag).be.exactly(0.7);
});

test("Returns 1 if wip is less than devDays", () /*: void */ => {
  const devDays = 7;
  const wip = 6;
  const drag = 0.25;
  const newDrag = dragFunction(devDays, wip, drag);
  should(newDrag).be.exactly(1);
});

test("Returns 1 if wip is equal to devDays", () /*: void */ => {
  const devDays = 7;
  const wip = 7;
  const drag = 0.25;
  const newDrag = dragFunction(devDays, wip, drag);
  should(newDrag).be.exactly(1);
});
