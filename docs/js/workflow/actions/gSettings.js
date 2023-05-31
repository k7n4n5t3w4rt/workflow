// @flow

export default (
  key /*: string | typeof undefined  */,
  value /*: number | typeof undefined  */,
) /*: GlobalSettings */ => {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis
  // Returning an empty object if gSettings is undefined at
  // least lets us check for the existence of individual parameters
  // without also needing to check that the object is not undefined
  // $FlowFixMe ~ https://github.com/facebook/flow/pull/7704
  if (globalThis.gSettings === undefined) {
    globalThis.gSettings = {};
  }

  // If there is a key and value pair, set the parameter
  if (key !== undefined && value !== undefined) {
    globalThis.gSettings[key] = value;
  }

  // Always returns an object so we can use the dot.notation
  return globalThis.gSettings;
};
