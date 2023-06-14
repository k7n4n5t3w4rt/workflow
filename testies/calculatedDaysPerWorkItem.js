// @flow
import { test, testPromise, should } from "../server/testy.js";
import glob from "glob";
import calculatedDaysPerWorkItem from "../js/workflow/calculations/calculatedDaysPerWorkItem.js";

const skip = false;

test("calculateDaysRemaining | returns the total effort power for all the people / number of work items", () /*: void */ => {
  should(calculatedDaysPerWorkItem(1, 400, 10)).be.exactly(40);
  should(calculatedDaysPerWorkItem(1, 400, 1000)).be.exactly(0.4);
  should(calculatedDaysPerWorkItem(1, 400, 100000)).be.exactly(0.004);
});
