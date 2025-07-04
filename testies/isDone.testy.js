// @flow
import { test } from "../server/testy.js";
import should from "should";
import isDone from "../js/flwAttrctr/calculations/isDone.js";

test("------- isDone.js -------", () => {
  should.exist(isDone);
});

test("should return true if the step is the last step", () => {
  const steps = [{}, {}, {}];
  should(isDone(2, steps)).be.true();
});

test("should return false if the step is not the last step", () => {
  const steps = [{}, {}, {}];
  should(isDone(1, steps)).be.false();
});
