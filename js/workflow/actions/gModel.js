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
    let storedSid = "NOT SET";
    try {
      storedSid = readSidFromLocalStore();
    } catch (e) {}
    if (
      storedSid !== null &&
      storedSid !== undefined &&
      storedSid !== "NOT SET"
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
    if (isParsable(value)) {
      value = JSON.parse(value);
    }
    return value;
  };
  //------------------------------------------------------------------------------
  // set()
  //------------------------------------------------------------------------------
  this.set = (
    key /*: string */,
    value /*: any  */,
  ) /*: () => GlobalModel */ => {
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
  this.setIfNotCached = async (
    key /*: string */,
    value /*: any  */,
  ) /*: Promise<GlobalModel> */ => {
    // First, set a value. This will be overwritten if it is in the cache.
    this.keyValuePairs[key] = value;
    // Ignore gState() - in case this function is called from `globalState()`
    if (this.sid === "workflowState") {
      return this;
    }
    // So that we can tell, in the functions below, which is newer
    let eSValue /*: any */ = "NOT SET";
    let eSTimestamp /*: number */ = 0;
    let lSValue /*: any */ = "NOT SET";
    let lSTimestamp /*: number */ = 0;
    const eSTmStmpVl = await readEasyStore(this.sid, eSTimestamp, eSValue, key);
    eSTimestamp = eSTmStmpVl.eSTimestamp;
    eSValue = eSTmStmpVl.eSValue;
    ({ lSTimestamp, lSValue } = readLocalStore(lSValue, lSTimestamp, key));
    // The value of eSTimestamp and lSTimestamp will be 0 if they don't
    // exist in either of the caches.
    // Use the value from Easy if the timestamp is newer
    if (eSTimestamp > lSTimestamp) {
      this.keyValuePairs[key] = eSValue;
      // And set localStorage
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
      value = lSValue;
      // And set localStorage
      if (typeof value !== "string") {
        value = JSON.stringify(value);
      }
      easyStorage.set(this.sid, key, value + "___" + lSTimestamp.toString());
    }
    // Use the local store value if the timestamps are the same
    if (lSTimestamp === eSTimestamp) {
      this.keyValuePairs[key] = lSValue;
    }
    // If nothing was cached, use the value provided and set both caches
    if (lSTimestamp === 0 && eSTimestamp === 0) {
      if (key === "arrivalRate") {
        console.log("lSTimestamp is === eSTimestamp");
      }
      this.keyValuePairs[key] = value;
      if (typeof value !== "string") {
        value = JSON.stringify(value);
      }
      const timestamp = Date.now().toString();
      easyStorage.set(this.sid, key, value + "___" + timestamp);
      try {
        localStorage.setItem(key, value + "___" + timestamp);
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
  ) /*: () => GlobalModel */ => {
    this.keyValuePairs[key] = value;
    // Ignore gState() - in case this function is called from `globalState()`
    if (this.sid === "workflowState") {
      return this;
    }
    let lSValue /*: any */ = "NOT SET";
    let lSTimestamp /*: number */ = 0;
    ({ lSTimestamp, lSValue } = readLocalStore(
      lSValue,
      lSTimestamp,
      "autoMode",
    ));
    // No Easy storage cache, but we still set localStorage
    if (typeof value !== "string") {
      value = JSON.stringify(value);
    }
    try {
      localStorage.setItem(key, value + "___" + Date.now().toString());
    } catch (e) {}
    return this;
  };
  //---------------------------------------------------------------------------
  // setNoCacheIfNotInLocalStorageAddToLocalStorage()
  //---------------------------------------------------------------------------
  this.setNoCacheIfNotInLocalStorageAddToLocalStorage = (
    key /*: string */,
    value /*: any  */,
  ) /*: () => GlobalModel */ => {
    this.keyValuePairs[key] = value;
    // Ignore gState() - in case this function is called from `globalState()`
    if (this.sid === "workflowState") {
      return this;
    }
    let lSValue /*: any */ = "NOT SET";
    let lSTimestamp /*: number */ = 0;
    ({ lSTimestamp, lSValue } = readLocalStore(lSValue, lSTimestamp, key));
    if (lSValue === "NOT SET") {
      // No Easy storage cache, but we still set localStorage
      if (typeof value !== "string") {
        value = JSON.stringify(value);
      }
      try {
        localStorage.setItem(key, value + "___" + Date.now().toString());
      } catch (e) {}
    }
    return this;
  };
}
export default gModel;
