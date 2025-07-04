// @flow
import { test } from "../server/testy.js";
import should from "should";
import globalReducer from "../js/flwAttrctr/calculations/globalReducer.js";

test("------- globalReducer.js -------", () => {
  should.exist(globalReducer);
});

test("should set a value in the state", () => {
  const state = { foo: "bar" };
  const action = { type: "SET", payload: { key: "baz", value: "qux" } };
  const newState = globalReducer(state, action);
  should(newState).deepEqual({ foo: "bar", baz: "qux" });
});

test("should overwrite an existing value in the state", () => {
  const state = { foo: "bar" };
  const action = { type: "SET", payload: { key: "foo", value: "qux" } };
  const newState = globalReducer(state, action);
  should(newState).deepEqual({ foo: "qux" });
});

test("should return the original state for an unknown action type", () => {
  const state = { foo: "bar" };
  // $FlowFixMe
  const action = { type: "UNKNOWN", payload: { key: "foo", value: "qux" } };
  const newState = globalReducer(state, action);
  should(newState).deepEqual({ foo: "bar" });
});
