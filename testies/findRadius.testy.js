// @flow
import { test, testPromise, should } from "../server/testy.js";
import glob from "glob";
import findRadius from "../js/workflow/calculations/findRadius.js";
const skip = false;

test("-------------- findRadius.js ---------------------", () /*: void */ => {
  should(1).be.exactly(1);
});

test("Returns zero if the volume is negative", () /*: void */ => {
  should(findRadius(-10)).be.exactly(0);
});

test("Returns the correct radius for a volume", () /*: void */ => {
  should(findRadius(10)).be.exactly(1.34);
  should(findRadius(674)).be.exactly(5.44);
});
