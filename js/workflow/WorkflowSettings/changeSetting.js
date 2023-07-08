import gSttngs from "../actions/gSttngs.js";
import isParsable from "../actions/isParsable.js";

export const changeSetting =
  (
    setting /*: string */,
    setStateFunctions /*: { [string]: (string|number|boolean) => void } */,
  ) =>
  (e /*: SyntheticInputEvent<HTMLInputElement> */) => {
    // Set the global settings for use in real-time, non-Preact JS
    let value = e.target.value;
    if (isParsable(value)) {
      value = JSON.parse(value);
    }
    gSttngs().set(setting, value);
    setStateFunctions[setting](value);
  };
