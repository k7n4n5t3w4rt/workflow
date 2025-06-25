// @flow
// Refer to copilot.md for TDD rules.
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
  // A result rounded to 3 decimal places
  should(calculateDaysRemaining(200.0004, 0.0001)).be.exactly(200);
  should(calculateDaysRemaining(200.0007, 0.0001)).be.exactly(200.001);
});

// A test for a third argument - the number of decimal places to round to
test("Returns the new days remaining with rounding", () /*: void */ => {
  should(calculateDaysRemaining(200.013, 0.002, 2)).be.exactly(200.01);
});
