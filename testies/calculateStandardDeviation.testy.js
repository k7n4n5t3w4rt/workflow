// @flow
import { test, should } from "../server/testy.js";
import calculateStandardDeviation from "../js/flwAttrctr/calculations/calculateStandardDeviation.js";

test("------- calculateStandardDeviation.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});

test("should return the correct standard deviation", () /*: void */ => {
  const numbers = [1, 2, 3, 4, 5];
  const result = calculateStandardDeviation(numbers);
  should(result).be.approximately(1.414, 0.001);
});