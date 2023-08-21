// @flow
import { test, testPromise, should } from "../server/testy.js";
import calculateDaysRemaining from "../js/flwAttrctr/calculations/calculateDaysRemaining.js";

const skip = false;

test("------- calculateDaysRemaining.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});
test("Returns the new days remaining", () /*: void */ => {
  should(calculateDaysRemaining(110, 100)).be.exactly(10);
  should(calculateDaysRemaining(100, 0.004)).be.exactly(99.996);
  should(calculateDaysRemaining(200.006, 0.004)).be.exactly(200.002);
  should(calculateDaysRemaining(200.003, 200.004)).be.exactly(0);
  const result = calculateDaysRemaining(200.0006, 200.0004);
  const resultDiff = result - 0.0002;
  const resultDiffAbs = Math.abs(resultDiff);
  // Allowing for floating point weirdness, We just
  // need the difference to be less than 0.001
  should(resultDiff).be.below(0.001);
});
