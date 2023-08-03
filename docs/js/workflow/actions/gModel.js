// @flow
//------------------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------------------
import easyStorage from "./easyStorage.js";
import isParsable from "./isParsable.js";

// gModel() - Needs to use the `function` keyword so we can do `new gModel()`
function gModel() /*: void */ {
  //------------------------------------------------------------------------------
  // easyStorageSid
  //------------------------------------------------------------------------------
  this.sid = "workflow"; // a default value
  //---------------------------------------------------------------------------
  // setSid()
  //---------------------------------------------------------------------------
  this.setSid = (sid /*: string */) /*: () => Object */ => {
    this.sid = sid;
    return this;
  };
  //---------------------------------------------------------------------------
  // getSid()
  //---------------------------------------------------------------------------
  this.getSid = () /*: string */ => {
    return this.sid;
  };
  //------------------------------------------------------------------------------
  // keyValuePairs
  //------------------------------------------------------------------------------
  this.keyValuePairs = {};
  //---------------------------------------------------------------------------
  // get()
  //---------------------------------------------------------------------------
  this.get = (key /*: string */) /*: any */ => {
    let value = this.keyValuePairs[key];
    if (isParsable(value)) {
      value = JSON.parse(value);
    }
    return value;
  };
  //------------------------------------------------------------------------------
  // set()
  //------------------------------------------------------------------------------
  this.set = (key /*: string */, value /*: any  */) /*: () => Object */ => {
    // Set the gSttngs()/gState() object
    this.keyValuePairs[key] = value;
    // Set localStorage and easyStorage cache
    // For easyStorage, we're ignoring gState() for now
    if (this.sid === "workflowState") {
      return this;
    }
    // Because localStorage and easyStoryage can only store strings,
    // we need to stringify. But we don't want to stringify strings.
    if (typeof value !== "string") {
      value = JSON.stringify(value);
    }
    // Add the timestamp so we can tell later which is newer
    value += "___" + Date.now().toString();
    try {
      // Set localStorage
      localStorage.setItem(key, value);
    } catch (e) {}
    // Set easyStorage
    easyStorage.set(this.sid, key, value);
    return this;
  };
  //---------------------------------------------------------------------------
  // setIfNotCached()
  //---------------------------------------------------------------------------
  // Set this, but only if it is not already in the cache.
  // NOTE: We're assuming that something in localStorage is also in the
  // easyStorage cache.
  this.setIfNotCached = (
    key /*: string */,
    value /*: any  */,
  ) /*: () => Object */ => {
    if (this.sid === "workflowState") {
      this.keyValuePairs[key] = value;
      return this;
    }
    // So that we can tell, in the functions below, which is newer
    let eSValue /*: any */ = "NOT SET";
    let eSTimestamp /*: number */ = 0;
    let lSValue /*: any */ = "NOT SET";
    let lSTimestamp /*: number */ = 0;
    // ----------------------------------------------------
    // easyStorage
    // ----------------------------------------------------
    ({ eSTimestamp, eSValue } = this.readEasyStore(eSTimestamp, eSValue)(key));
    // ----------------------------------------------------
    // localStorage
    // ----------------------------------------------------
    let lSValueTimestamp /*: string | null | typeof undefined */ = null;
    try {
      // Check if it already exists in localStorage
      lSValueTimestamp = localStorage.getItem(key);
    } catch (e) {}
    // First, check that we got something out of localStorage
    if (lSValueTimestamp !== null && lSValueTimestamp !== undefined) {
      // Split the string into value and timestamp
      const lSValueString /*: string */ = lSValueTimestamp.split("___")[0];
      const lSTimestampString /*: string */ = lSValueTimestamp.split("___")[1];
      if (lSValueString !== undefined && lSTimestampString !== undefined) {
        // Strings don't need to be parsed - and some will throw an error
        if (isParsable(lSValueString) && isParsable(lSTimestampString)) {
          lSValue = JSON.parse(lSValueString);
          lSTimestamp = parseInt(lSTimestampString, 10);
        }
      }
    }
    // The value of eSTimestamp and lSTimestamp will be 0 if they don't
    // exist in either of the caches.
    // Use the value from Easy if the timestamp is newer
    if (eSTimestamp > lSTimestamp) {
      this.keyValuePairs[key] = eSValue;
      // And set localStorage
      // It doesn't exist in localStorage, so set it
      if (typeof eSValue !== "string") {
        value = JSON.stringify(eSValue);
      }
      try {
        localStorage.setItem(key, value + "___" + eSTimestamp.toString());
      } catch (e) {}
    }
    // Use the value from local storage if the timestamp is newer
    if (lSTimestamp > eSTimestamp) {
      this.keyValuePairs[key] = lSValue;
      // And set localStorage
      if (typeof lSValue !== "string") {
        value = JSON.stringify(lSValue);
      }
      easyStorage.set(this.sid, key, value + "___" + lSTimestamp.toString());
    }
    // If nothing was cached, use the value provided and set both caches
    if (lSTimestamp === 0 && eSTimestamp === 0) {
      this.keyValuePairs[key] = value;
      if (typeof value !== "string") {
        value = JSON.stringify(value);
      }
      easyStorage.set(this.sid, key, value + "___" + lSTimestamp.toString());
      try {
        localStorage.setItem(key, value + "___" + eSTimestamp.toString());
      } catch (e) {}
    }
    return this;
  };
  //---------------------------------------------------------------------------
  // setNoCache()
  //---------------------------------------------------------------------------
  this.setNoCache = (
    key /*: string */,
    value /*: any  */,
  ) /*: () => Object */ => {
    this.keyValuePairs[key] = value;
    if (this.sid === "workflowState") {
      this.keyValuePairs[key] = value;
      return this;
    }
    // So that we can tell, in the functions below, which is newer
    let lSTimestampNumber /*: number */ = 0;
    let eSTimestampNumber /*: number */ = 0;
    // ----------------------------------------------------
    // localStorage
    // ----------------------------------------------------
    let lSValueTimestamp /*: string | null | typeof undefined */ = null;
    try {
      // Check if it already exists in localStorage
      lSValueTimestamp = localStorage.getItem(key);
      // First, check that we got something out of localStorage
      if (lSValueTimestamp !== null && lSValueTimestamp !== undefined) {
        // Split the string into value and timestamp
        let lSValue /*: string */ = lSValueTimestamp.split("___")[0];
        let lSTimestamp /*: string */ = lSValueTimestamp.split("___")[1];
        if (lSValue !== undefined && lSTimestamp !== undefined) {
          // Strings don't need to be parsed - and some will throw an error
          if (isParsable(lSValue) && isParsable(lSTimestamp)) {
            lSValue = JSON.parse(lSValue);
            lSTimestampNumber = parseInt(lSTimestamp, 10);
          }
          // Use the value from localStorage
          this.keyValuePairs[key] = lSValue;
        }
      } else {
        // It doesn't exist in localStorage, so set it
        if (typeof value !== "string") {
          value = JSON.stringify(value);
        }
        localStorage.setItem(key, value + "___" + Date.now().toString());
      }
    } catch (e) {
      // console.error(e);
    }
    return this;
  };
  this.readEasyStore =
    (eSTimestamp /*: number */, eSValue /*: any */) => (key /*: string */) => {
      easyStorage
        .get(this.sid, key)
        .then((valueObj /*: {[string]:string} | null */) => {
          // First, check that we got something out of easyStorage
          if (
            valueObj !== null &&
            valueObj !== undefined &&
            valueObj[key] !== undefined
          ) {
            const eSValueTimestamp = valueObj[key];
            // Split the string into value and timestamp
            const eSValueString /*: string */ =
              eSValueTimestamp.split("___")[0];
            const eSTimestampString /*: string */ =
              eSValueTimestamp.split("___")[1];
            // Check that we got a value and a timestamp
            if (
              eSValueString !== undefined &&
              eSTimestampString !== undefined
            ) {
              // Strings don't need to be parsed - and some will throw an error
              if (isParsable(eSValueString) && isParsable(eSTimestampString)) {
                eSTimestamp = parseInt(eSTimestampString, 10);
                eSValue = JSON.parse(eSValueString);
              }
            }
          }
        });
      return { eSTimestamp, eSValue };
    };
}
export default gModel;
