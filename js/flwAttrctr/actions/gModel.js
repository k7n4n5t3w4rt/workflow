// @flow
//------------------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------------------
import easyStorage from "./easyStorage.js";
import isParsable from "./isParsable.js";
import readEasyStore from "./readEasyStore.js";
import readLocalStore from "./readLocalStore.js";
import readSidFromLocalStore from "./readSidFromLocalStore.js";
//------------------------------------------------------------------------------
// gModel() - Needs to use the `function` keyword so we can do `new gModel()`
//------------------------------------------------------------------------------
function gModel() /*: void */ {
  //------------------------------------------------------------------------------
  // easyStorageSid
  //------------------------------------------------------------------------------
  this.sid = "workflow"; // a default value
  //---------------------------------------------------------------------------
  // setSid()
  //---------------------------------------------------------------------------
  this.setSid = (sid /*: string */) /*: () => GlobalModel */ => {
    this.sid = sid;
    try {
      localStorage.setItem("sid", sid);
    } catch (e) {}
    return this;
  };
  //---------------------------------------------------------------------------
  // setSidButNotInLocalStore()
  //---------------------------------------------------------------------------
  this.setSidButNotInLocalStore = (
    sid /*: string */,
  ) /*: () => GlobalModel */ => {
    this.sid = sid;
    return this;
  };
  //---------------------------------------------------------------------------
  // setSidIfNotInLocalStore()
  //---------------------------------------------------------------------------
  this.setSidIfNotInLocalStore = (
    sid /*: string */,
  ) /*: () => GlobalModel */ => {
    let storedSid = "NOT SET 3";
    try {
      storedSid = readSidFromLocalStore();
    } catch (e) {}
    if (
      storedSid !== null &&
      storedSid !== undefined &&
      storedSid !== "NOT SET 3"
    ) {
      this.sid = storedSid;
    } else {
      this.sid = sid;
      try {
        localStorage.setItem("sid", sid);
      } catch (e) {}
    }
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
    // Check localStorage in case it has been updated
    // in another tab
    let lSValue /*: any */ = "NOT SET 6";
    let lSTimestamp /*: number */ = 0;
    ({ lSTimestamp, lSValue } = readLocalStore(lSValue, lSTimestamp, key));
    if (lSValue !== "NOT SET 6") {
      value = lSValue;
    }
    if (isParsable(value)) {
      value = JSON.parse(value);
    }
    return value;
  };
  //------------------------------------------------------------------------------
  // clear()
  //------------------------------------------------------------------------------
  this.clear = () /*: () => GlobalModel */ => {
    this.keyValuePairs = [];
    return this;
  };
  //------------------------------------------------------------------------------
  // set()
  //------------------------------------------------------------------------------
  this.set = (key /*: string */, value /*: any  */) /*: any */ => {
    console.log(`Setting key: ${key}, value: ${JSON.stringify(value)}`);
    // Set the gSttngs()/gState() object
    this.keyValuePairs[key] = value;
    // Set localStorage and easyStorage cache
    // For easyStorage, we're ignoring gState() for now
    if (this.sid === "workflowState") {
      return value;
    }
    // Because localStorage and easyStoryage can only store strings,
    // we need to stringify. But we don't want to stringify strings.
    const valueValue = value;
    const valueWithTimestamp = JSON.stringify(value) + "___" + Date.now().toString();
    try {
      // Set localStorage
      localStorage.setItem(key, valueWithTimestamp);
    } catch (e) {}
    if (this.keyValuePairs.easyStorage === true) {
      // Set easyStorage
      easyStorage.set(this.sid, key, valueWithTimestamp);
    }
    return valueValue;
  };
  //---------------------------------------------------------------------------
  // setIfNotCached()
  //---------------------------------------------------------------------------
  // Set this, but only if it is not already in the cache.
  this.setIfNotCached = async (
    key /*: string */,
    value /*: any  */,
  ) /*: Promise<any> */ => {
    // Ignore gState() - in case this function is called from `globalState()`
    if (this.sid === "workflowState") {
      return value;
    }
    // So that we can tell, in the functions below, which is newer
    let eSValue /*: any */ = "NOT SET 4";
    let eSTimestamp /*: number */ = 0;
    if (this.keyValuePairs.easyStorage === true) {
      const eSTmStmpVl = await readEasyStore(
        this.sid,
        eSTimestamp,
        eSValue,
        key,
      );
      eSTimestamp = eSTmStmpVl.eSTimestamp;
      eSValue = eSTmStmpVl.eSValue;
    }
    let lSValue /*: any */ = "NOT SET 5";
    let lSTimestamp /*: number */ = 0;
    ({ lSTimestamp, lSValue } = readLocalStore(lSValue, lSTimestamp, key));
    if (eSTimestamp > lSTimestamp) {
      this.keyValuePairs[key] = eSValue;
      // And set localStorage
      const valueWithTimestamp = JSON.stringify(eSValue) + "___" + eSTimestamp.toString();
      try {
        localStorage.setItem(key, valueWithTimestamp);
      } catch (e) {}
      if (isParsable(value)) {
        value = JSON.parse(value);
      }
      return value;
    }
    // Use the value from local storage if the timestamp is newer
    if (lSTimestamp > eSTimestamp) {
      this.keyValuePairs[key] = lSValue;
      value = lSValue;
      // And set localStorage
      const valueWithTimestamp = JSON.stringify(value) + "___" + lSTimestamp.toString();
      if (this.keyValuePairs.easyStorage === true) {
        easyStorage.set(this.sid, key, valueWithTimestamp);
      }
      if (isParsable(value)) {
        value = JSON.parse(value);
      }
      return value;
    }
    // Use the local store value if the timestamps are the same
    if (eSTimestamp > 0 && lSTimestamp > 0 && lSTimestamp === eSTimestamp) {
      this.keyValuePairs[key] = lSValue;
      if (isParsable(lSValue)) {
        lSValue = JSON.parse(lSValue);
      }
      return lSValue;
    }
    // If nothing was cached, use the value provided and set both caches
    if (lSTimestamp === 0 && eSTimestamp === 0) {
      this.keyValuePairs[key] = value;
      const valueWithTimestamp = JSON.stringify(value) + "___" + Date.now().toString();
      if (this.keyValuePairs.easyStorage === true) {
        easyStorage.set(this.sid, key, valueWithTimestamp);
      }
      try {
        localStorage.setItem(key, valueWithTimestamp);
      } catch (e) {}
      if (isParsable(value)) {
        value = JSON.parse(value);
      }
      return value;
    }
    if (isParsable(value)) {
      value = JSON.parse(value);
    }
    return value;
  };
  //---------------------------------------------------------------------------
  // setNoCache()
  //---------------------------------------------------------------------------
  this.setNoCache = (key /*: string */, value /*: any  */) /*: any */ => {
    this.keyValuePairs[key] = value;
    // Ignore gState() - in case this function is called from `globalState()`
    if (this.sid === "workflowState") {
      return value;
    }
    let lSValue /*: any */ = "NOT SET 1";
    let lSTimestamp /*: number */ = 0;
    ({ lSTimestamp, lSValue } = readLocalStore(
      lSValue,
      lSTimestamp,
      "autoMode",
    ));
    // No Easy storage cache, but we still set localStorage
    const valueWithTimestamp = JSON.stringify(value) + "___" + Date.now().toString();
    try {
      localStorage.setItem(key, valueWithTimestamp);
    } catch (e) {}
    if (isParsable(value)) {
      value = JSON.parse(value);
    }
    return value;
  };
  //---------------------------------------------------------------------------
  // setNoCacheIfNotInLocalStorageAddToLocalStorage()
  //---------------------------------------------------------------------------
  this.setNoCacheIfNotInLocalStorageAddToLocalStorage = (
    key /*: string */,
    value /*: any  */,
  ) /*:  any */ => {
    this.keyValuePairs[key] = value;
    // Ignore gState() - in case this function is called from `globalState()`
    if (this.sid === "workflowState") {
      return value;
    }
    let lSValue /*: any */ = "NOT SET 2";
    let lSTimestamp /*: number */ = 0;
    ({ lSTimestamp, lSValue } = readLocalStore(lSValue, lSTimestamp, key));
    if (lSValue === "NOT SET 2") {
      // No Easy storage cache, but we still set localStorage
      const valueWithTimestamp = JSON.stringify(value) + "___" + Date.now().toString();
      try {
        localStorage.setItem(key, valueWithTimestamp);
      } catch (e) {}
    }
    if (isParsable(value)) {
      value = JSON.parse(value);
    }
    return value;
  };
}
export default gModel;
