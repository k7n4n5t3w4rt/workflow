// @flow
import { test, should } from "../server/testy.js";
import round2Places from "../js/flwAttrctr/calculations/round2Places.js";

test("------- round2Places.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});

test("should round a number to 2 decimal places", () /*: void */ => {
  should(round2Places(1.2345)).equal(1.23);
});

test("should round a number up to 2 decimal places", () /*: void */ => {
  should(round2Places(1.2355)).equal(1.24);
});
