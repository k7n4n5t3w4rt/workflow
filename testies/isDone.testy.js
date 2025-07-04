// @flow
import { test } from "../server/testy.js";
import should from "should";
import isDone from "../js/flwAttrctr/calculations/isDone.js";

test("------- isDone.js -------", () => {
  should.exist(isDone);
});

test("should return true if the step is the last step", () => {
  const steps = [{}, {}, {}];
  isDone(2, steps).should.be.true();
});

test("should return false if the step is not the last step", () => {
  const steps = [{}, {}, {}];
  isDone(1, steps).should.be.false();
});