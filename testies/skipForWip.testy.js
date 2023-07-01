// @flow
//------------------------------------------------------------------
// IMPORT: TESTY
//------------------------------------------------------------------
import { test, testPromise, should } from "../server/testy.js";
//------------------------------------------------------------------
// IMPORT: FUNCTION UNDER TEST
//------------------------------------------------------------------
import skipForWip from "../js/workflow/actions/skipForWip.js";
//------------------------------------------------------------------
// TEST: skipForWip()
//------------------------------------------------------------------
test("------- skipForWip.js -------", () /*: void */ => {
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
