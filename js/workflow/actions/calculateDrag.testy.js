// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import globalSettings from "./globalSettings.js";
//------------------------------------------------------------------
// IMPORT: TESTY
//------------------------------------------------------------------
import { test, testPromise, should } from "../../../server/testy.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import round2Places from "../calculations/round2Places.js";
//------------------------------------------------------------------
// IMPORT: calculateDragFactor()
//------------------------------------------------------------------
import calculateDragFactor from "./calculateDragFactor.js";
//------------------------------------------------------------------------------
// FIXTURES
//------------------------------------------------------------------------------
const fixture = () /*: void */ => {
  globalSettings();
};
//------------------------------------------------------------------
// TEST: calculateDrag
//------------------------------------------------------------------
test("------- calculateDrag.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});

test("Drag of 0, for WIP of 2", () /*: void */ => {
  fixture();
  gSttngs().set("drag", 0);
  const wip = 2;
  const dragFactor = calculateDragFactor(wip);
  should(dragFactor).be.exactly(0.5);
});

test("Drag of 0.5, for WIP of 1", () /*: void */ => {
  fixture();
  gSttngs().set("drag", 0.5);
  const wip = 1;
  const dragFactor = calculateDragFactor(wip);
  should(dragFactor).be.exactly(1);
});

test("Drag of 0.5, WIP of 2", () /*: void */ => {
  fixture();
  gSttngs().set("drag", 0.5);
  const wip = 2;
  const dragFactor = calculateDragFactor(wip);
  should(round2Places(dragFactor)).be.exactly(0.25);
});

test("Drag of 0, for WIP of 3", () /*: void */ => {
  fixture();
  gSttngs().set("drag", 0);
  const wip = 3;
  const dragFactor = calculateDragFactor(wip);
  should(round2Places(dragFactor)).be.exactly(0.33);
});

// test("Drag of 0.5, for WIP of 20", () /*: void */ => {
//   fixture();
//   gSttngs().set("drag", 0.5);
//   const wip = 20;
//   const dragFactor = calculateDragFactor(wip);
//   should(dragFactor).be.above(0.0001);
//   should(dragFactor).be.below(0.0002);
// });

// test("Drag of 0.05, for WIP of 2", () /*: void */ => {
//   fixture();
//   gSttngs().set("drag", 0.05);
//   const wip = 2;
//   const dragFactor = calculateDragFactor(wip);
//   should(dragFactor).be.above(0.0001);
//   should(dragFactor).be.below(0.0002);
// });
