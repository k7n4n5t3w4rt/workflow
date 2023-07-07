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
  this.setSid = (sid /*: string */) /*: () => void */ => {
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
    const value = this.keyValuePairs[key];
    return value;
  };
  //------------------------------------------------------------------------------
  // set()
  //------------------------------------------------------------------------------
  this.set = (key /*: string */, value /*: any  */) /*: () => void */ => {
    this.keyValuePairs[key] = value;
    try {
      if (typeof value !== "string") {
        value = JSON.stringify(value);
      }
      localStorage.setItem(key, value);
      easyStorage.set(this.sid, key, value);
    } catch (e) {
      console.error(e);
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
  ) /*: () => void */ => {
    this.keyValuePairs[key] = value;
    // ----------------------------------------------------
    // localStorage
    // ----------------------------------------------------
    try {
      let lSValue = localStorage.getItem(key);
      if (lSValue !== null && lSValue !== undefined) {
        if (isParsable(lSValue)) {
          lSValue = JSON.parse(lSValue);
        }
        this.keyValuePairs[key] = lSValue;
      } else {
        if (typeof value !== "string") {
          value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error(e);
    }
    // ----------------------------------------------------
    // easyStorage
    // ----------------------------------------------------
    // try {
    //   easyStorage
    //     .get(this.sid, key)
    //     .then((valueObj /*: {[string]:string} */) /*: void */ => {
    //       if (
    //         valueObj[key] !== undefined &&
    //         valueObj[key] !== this.keyValuePairs[key]
    //       ) {
    //         if (isParsable(valueObj[key])) {
    //           this.keyValuePairs[key] = JSON.parse(valueObj[key]);
    //         }
    //       } else {
    //         if (typeof value !== "string") {
    //           value = JSON.stringify(value);
    //         }
    //         easyStorage.set(this.sid, key, value);
    //       }
    //     });
    // } catch (e) {
    //   console.error(e);
    // }
    return this;
  };
}
export default gModel;
