// @flow
import { test, should } from "../server/testy.js";
import isDone from "../js/flwAttrctr/calculations/isDone.js";

test("------- isDone.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});

test("should return true if the step is the last step", () /*: void */ => {
  const mockStep /*: FlwStep */ = {
    name: "test step",
    status: "touch",
    limit: 1,
    movingLimit: 1,
    avAge: 1,
    devUnits: 1,
    flwTimeAtStart: 1,
    actualFlwTime: 1,
    movingDevUnits: 1,
  };
  const steps = [mockStep, mockStep, mockStep];
  should(isDone(2, steps)).be.true();
});

test("should return false if the step is not the last step", () /*: void */ => {
  const mockStep /*: FlwStep */ = {
    name: "test step",
    status: "touch",
    limit: 1,
    movingLimit: 1,
    avAge: 1,
    devUnits: 1,
    flwTimeAtStart: 1,
    actualFlwTime: 1,
    movingDevUnits: 1,
  };
  const steps = [mockStep, mockStep, mockStep];
  should(isDone(1, steps)).be.false();
});
