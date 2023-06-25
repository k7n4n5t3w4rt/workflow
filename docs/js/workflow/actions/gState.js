// @flow
import gModel from "./gModel.js";

export default () /*: GlobalModel */ => {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis
  // Returning an empty object if gState is undefined at
  // least lets us check for the existence of individual parameters
  // without also needing to check that the object is not undefined
  // $FlowFixMe ~ https://github.com/facebook/flow/pull/7704
  if (globalThis.gState === undefined) {
    globalThis.gState = new gModel();
  }
  // Always returns an object so we can use the dot.notation
  return globalThis.gState;
};
