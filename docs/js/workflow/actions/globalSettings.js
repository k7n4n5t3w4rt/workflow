// @flow

export default (
  key /*: string | typeof undefined  */,
  value /*: number | typeof undefined  */,
) /*: {speed: number} */ => {
  // Returning an empty object if globalSettings is undefined at
  // least lets us check for the existence of individual parameters
  // without also needing to check that the object is not undefined
  // $FlowFixMe ~ https://github.com/facebook/flow/pull/7704
  if (globalThis.globalSettings === undefined) {
    globalThis.globalSettings = {};
  }

  // If there is a key and value pair, set the parameter
  if (key !== undefined && value !== undefined) {
    globalThis.globalSettings[key] = value;
  }

  // Always returns an object so we can use the dot.notation
  return globalThis.globalSettings;
};
