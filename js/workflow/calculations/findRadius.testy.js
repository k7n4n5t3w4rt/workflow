// @flow
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import { test, testPromise, should } from "../../../server/testy.js";
//------------------------------------------------------------------
// IMPORT: The functions we're testing
//------------------------------------------------------------------
import findRadius from "./findRadius.js";
//------------------------------------------------------------------
// TEST: findRadius()
//------------------------------------------------------------------
test("------- findRadius.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});

test("Returns zero if the volume is negative", () /*: void */ => {
  should(findRadius(-10)).be.exactly(0);
});

test("Returns the correct radius for a volume", () /*: void */ => {
  should(findRadius(10)).be.exactly(1.34);
  should(findRadius(674)).be.exactly(5.44);
});
