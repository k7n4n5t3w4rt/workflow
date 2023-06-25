// @flow
import { test, testPromise, should } from "../server/testy.js";
import gSttngs from "../js/workflow/actions/gSttngs.js";
import glob from "glob";

const skip = false;

test("-------------- gSttngs.js ---------------------", () /*: void */ => {
  should(1).be.exactly(1);
});

test("Returns an empty object if the globalThis.gSttngs object is not set", () /*: void */ => {
  should(JSON.stringify(gSttngs())).be.exactly(JSON.stringify({}));
});

test("Passing in a key/value pair sets the parameter", () /*: void */ => {
  should(JSON.stringify(gSttngs().set("speed", 2))).be.exactly(
    JSON.stringify({ speed: 2 }),
  );
});
