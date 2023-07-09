// @flow
//------------------------------------------------------------------
// IMPORT: TESTY
//------------------------------------------------------------------
import { test, testPromise, should } from "../../../server/testy.js";
import calculateRange2 from "./calculateRange.js";
//------------------------------------------------------------------
// TEST: calculateRange2
//------------------------------------------------------------------
test("------- calculateRange2.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});

test("Calculates a range", () /*: void */ => {
  const range = calculateRange2(1);
  should(range).be.exactly(2);
});
