// @flow
import { test, testPromise, should } from "../server/testy.js";
import gSettings from "../js/workflow/actions/gSettings.js";
import glob from "glob";

const skip = false;

test("gSettings | returns an empty object if the globalThis.gSettings object is not set", () /*: void */ => {
  should(JSON.stringify(gSettings())).be.exactly(JSON.stringify({}));
});

test("gSettings | Passing in a key/value pair sets the parameter", () /*: void */ => {
  should(JSON.stringify(gSettings("speed", 2))).be.exactly(
    JSON.stringify({ speed: 2 }),
  );
});
