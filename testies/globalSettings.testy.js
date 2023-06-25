// @flow
import { test, testPromise, should } from "../server/testy.js";
import gSttngs from "../js/workflow/actions/gSttngs.js";
import glob from "glob";

const skip = false;

test("------- gSttngs.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});

test("Passing in a key/value pair sets the parameter", () /*: void */ => {
  should(gSttngs().set("speed", 2).get("speed")).be.exactly(2);
});
