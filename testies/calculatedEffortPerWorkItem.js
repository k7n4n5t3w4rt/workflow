// @flow
import { test, testPromise, should } from "../server/testy.js";
import glob from "glob";
import { calculatedEffortPerWorkItem } from "../js/workflow/calculations/calculatedEffortPerWorkItem.js";

const skip = false;

test("calculateEffortRemaining | returns the total effort power for all the people / number of work items", () /*: void */ => {
  should(calculatedEffortPerWorkItem(1, 400, 10)).be.exactly(40);
  should(calculatedEffortPerWorkItem(1, 400, 1000)).be.exactly(0.4);
  should(calculatedEffortPerWorkItem(1, 400, 100000)).be.exactly(0.004);
});
