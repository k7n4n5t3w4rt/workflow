// @flow
import gModel from "./gModel";

export default () /*: GlobalModel */ => {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis
  // Returning an empty object if gSttngs is undefined at
  // least lets us check for the existence of individual parameters
  // without also needing to check that the object is not undefined
  // $FlowFixMe ~ https://github.com/facebook/flow/pull/7704
  if (globalThis.gSttngs === undefined) {
    globalThis.gSttngs = new gModel();
  }
  // Always returns an object so we can use the dot.notation
  return globalThis.gSttngs;
};
