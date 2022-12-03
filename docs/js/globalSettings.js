// @flow

export default (
  key /*: string | typeof undefined  */,
  value /*: number | typeof undefined  */,
) /*: {speed: number} */ => {
  if (window.globalSettings === undefined) {
    window.globalSettings = {};
  }

  if (key !== undefined && value !== undefined) {
    window.globalSettings[key] = value;
  }

  return window.globalSettings;
};
