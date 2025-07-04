// @flow
import should from "should";
import calculateStandardDeviation from "../js/flwAttrctr/calculations/calculateStandardDeviation.js";

describe("calculateStandardDeviation", () => {
  it("should return the correct standard deviation", () => {
    const numbers = [1, 2, 3, 4, 5];
    const result = calculateStandardDeviation(numbers);
    result.should.be.approximately(1.414, 0.001);
  });
});
