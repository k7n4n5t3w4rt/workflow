// @flow
//------------------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------------------
import {
  isParsableAsNumber,
  isParsableAsBoolean,
  isParsableAsArray,
} from "./isParsable.js";

// gModel() - Needs to use the `function` keyword so we can do `new gModel()`
function gModel() /*: void */ {
  this.keyValuePairs = {};

  this.set = (key /*: string */, value /*: any  */) /*: () => void */ => {
    this.keyValuePairs[key] = value;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // console.error(e);
    }
    return this;
  };
  // Set this, but only if it is not already in the cache.
  this.setIfNotCached = (
    key /*: string */,
    value /*: any  */,
  ) /*: () => void */ => {
    this.keyValuePairs[key] = value;
    try {
      let lSValue = localStorage.getItem(key);
      if (lSValue !== null && lSValue !== undefined) {
        if (
          isParsableAsNumber(lSValue) ||
          isParsableAsNumber(lSValue) ||
          isParsableAsBoolean(lSValue) ||
          isParsableAsArray(lSValue)
        ) {
          lSValue = JSON.parse(lSValue);
        }
        this.keyValuePairs[key] = lSValue;
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (e) {
      // console.error(e);
    }
    return this;
  };
  this.get = (key /*: string */) /*: any */ => {
    const value = this.keyValuePairs[key];
    return value;
  };
}
export default gModel;
