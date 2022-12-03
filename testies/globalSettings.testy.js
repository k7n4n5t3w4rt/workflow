// @flow
import { test, testPromise, should } from "../server/testy.js";
import globalSettings from "../js/three-bubble-sort/actions/globalSettings.js";
import glob from "glob";

const skip = false;

test("globalSettings | returns an empty object if the globalThis.globalSettings object is not set", () /*: void */ => {
  should(JSON.stringify(globalSettings())).be.exactly(JSON.stringify({}));
});

test("globalSettings | Passing in a key/value pair sets the parameter", () /*: void */ => {
  should(JSON.stringify(globalSettings("speed", 2))).be.exactly(
    JSON.stringify({ speed: 2 }),
  );
});
