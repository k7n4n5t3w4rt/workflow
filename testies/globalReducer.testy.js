// @flow
import { test, should } from "../server/testy.js";
import globalReducer from "../js/flwAttrctr/calculations/globalReducer.js";

test("------- globalReducer.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});

test("should set a value in the state", () /*: void */ => {
  const state = { foo: "bar" };
  const action = { type: "SET", payload: { key: "baz", value: "qux" } };
  const newState = globalReducer(state, action);
  should(newState).deepEqual({ foo: "bar", baz: "qux" });
});

test("should overwrite an existing value in the state", () /*: void */ => {
  const state = { foo: "bar" };
  const action = { type: "SET", payload: { key: "foo", value: "qux" } };
  const newState = globalReducer(state, action);
  should(newState).deepEqual({ foo: "qux" });
});
