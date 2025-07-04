// @flow
import { test } from "../server/testy.js";
import should from "should";
import round2Places from "../js/flwAttrctr/calculations/round2Places.js";

test("------- round2Places.js -------", () => {
  should.exist(round2Places);
});

test("should round a number to 2 decimal places", () => {
  round2Places(1.2345).should.equal(1.23);
});

test("should round a number up to 2 decimal places", () => {
  round2Places(1.2355).should.equal(1.24);
});