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
    if (this.sid !== "workflowState") {
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
      } catch (e) {
        // console.error(e);
        // console.error("localStorage.setItem() failed for key: " + key);
      }
      // Set easyStorage
      easyStorage.set(this.sid, key, value);
    }
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
    this.keyValuePairs[key] = value;
    if (this.sid !== "workflowState") {
      // So that we can tell, in the functions below, which is newer
      let lSTimestampNumber /*: number */ = 0;
      let eSTimestampNumber /*: number */ = 0;
      // ----------------------------------------------------
      // localStorage
      // ----------------------------------------------------
      try {
        // Check if it already exists in localStorage
        const lSValueTimestamp /*: string | null | typeof undefined */ =
          localStorage.getItem(key);
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
      // ----------------------------------------------------
      // easyStorage
      // ----------------------------------------------------
      try {
        easyStorage
          .get(this.sid, key)
          .then((valueObj /*: {[string]:string} | null */) /*: void */ => {
            // First, check that we got something out of easyStorage
            if (
              valueObj !== null &&
              valueObj !== undefined &&
              valueObj[key] !== undefined
            ) {
              const eSValueTimestamp = valueObj[key];
              // Split the string into value and timestamp
              let eSValue /*: string */ = eSValueTimestamp.split("___")[0];
              let eSTimestamp /*: string */ = eSValueTimestamp.split("___")[1];
              // Check that we got a value and a timestamp
              if (eSValue !== undefined && eSTimestamp !== undefined) {
                // Strings don't need to be parsed - and some will throw an error
                if (isParsable(eSValue) && isParsable(eSTimestamp)) {
                  eSTimestampNumber = parseInt(eSTimestamp, 10);
                  eSValue = JSON.parse(eSValue);
                }
                // Use the value from Easy if the timestamp is newer
                if (eSTimestampNumber > lSTimestampNumber) {
                  this.keyValuePairs[key] = eSValue;
                  // And set localStorage
                  try {
                    localStorage.setItem(key, eSValue);
                  } catch (e) {
                    // console.error(e);
                  }
                }
              }
            } else {
              // It doesn't exist in easyStorage, so set it
              if (typeof value !== "string") {
                value = JSON.stringify(value);
              }
              // lSTimestampNumber will either be Date.now() or the timestamp
              // from localStorage
              if (lSTimestampNumber === 0) {
                lSTimestampNumber = Date.now();
              }
              easyStorage.set(
                this.sid,
                key,
                value + "___" + lSTimestampNumber.toString(),
              );
            }
          });
      } catch (e) {
        // console.error(e);
      }
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
    if (this.sid !== "workflowState") {
      // So that we can tell, in the functions below, which is newer
      let lSTimestampNumber /*: number */ = 0;
      let eSTimestampNumber /*: number */ = 0;
      // ----------------------------------------------------
      // localStorage
      // ----------------------------------------------------
      try {
        // Check if it already exists in localStorage
        const lSValueTimestamp /*: string | null | typeof undefined */ =
          localStorage.getItem(key);
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
    }
    return this;
  };
}
export default gModel;
