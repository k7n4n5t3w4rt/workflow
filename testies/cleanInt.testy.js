// @flow
import { test, should } from "../server/testy.js";
import cleanInt from "../js/flwAttrctr/calculations/cleanInt.js";

test("------- cleanInt.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});

test("should return a positive integer from a string", () /*: void */ => {
  should(cleanInt("42")).equal(42);
});

test("should return a positive integer from a negative string", () /*: void */ => {
  should(cleanInt("-42")).equal(42);
});

test("should return a positive integer from a float string", () /*: void */ => {
  should(cleanInt("42.42")).equal(42);
});

test("should return 0 from a non-numeric string", () /*: void */ => {
  should(cleanInt("foo")).equal(0);
});
