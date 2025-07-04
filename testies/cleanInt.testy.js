// @flow
import { test } from "../server/testy.js";
import should from "should";
import cleanInt from "../js/flwAttrctr/calculations/cleanInt.js";

test("------- cleanInt.js -------", () => {
  should.exist(cleanInt);
});

test("should return a positive integer from a string", () => {
  cleanInt("42").should.equal(42);
});

test("should return a positive integer from a negative string", () => {
  cleanInt("-42").should.equal(42);
});

test("should return a positive integer from a float string", () => {
  cleanInt("42.42").should.equal(42);
});

test("should return 0 from a non-numeric string", () => {
  cleanInt("foo").should.equal(0);
});