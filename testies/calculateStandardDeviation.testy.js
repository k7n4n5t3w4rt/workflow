// @flow
import { test } from "../server/testy.js";
import should from "should";
import calculateStandardDeviation from "../js/flwAttrctr/calculations/calculateStandardDeviation.js";

test("------- calculateStandardDeviation.js -------", () => {
  should.exist(calculateStandardDeviation);
});

test("should return the correct standard deviation", () => {
  const numbers = [1, 2, 3, 4, 5];
  const result = calculateStandardDeviation(numbers);
  result.should.be.approximately(1.414, 0.001);
});