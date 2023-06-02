// @flow
import { test, testPromise, should } from "../server/testy.js";
import glob from "glob";
import calculateEffortRemaining from "../js/workflow/calculations/calculateEffortRemaining.js";

const skip = false;

test("calculateEffortRemaining | returns the new effort remaining", () /*: void */ => {
  should(calculateEffortRemaining(110, 100)).be.exactly(10);
  should(calculateEffortRemaining(100, 0.004)).be.exactly(99.996);
  should(calculateEffortRemaining(200.006, 0.004)).be.exactly(200.002);
  should(calculateEffortRemaining(200.003, 200.004)).be.exactly(0);
  const result = calculateEffortRemaining(200.0006, 200.0004);
  const resultDiff = result - 0.0002;
  const resultDiffAbs = Math.abs(resultDiff);
  // Allowing for floating point weirdness, We just
  // need the difference to be less than 0.001
  should(resultDiff).be.below(0.001);
});
