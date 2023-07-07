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
    let value = this.keyValuePairs[key];
    if (isParsable(value)) {
      value = JSON.parse(value);
    }
    return value;
  };
  //------------------------------------------------------------------------------
  // set()
  //------------------------------------------------------------------------------
  this.set = (key /*: string */, value /*: any  */) /*: () => void */ => {
    this.keyValuePairs[key] = value;
    if (
      key !== "vQueue" &&
      key !== "flwTmQueue" &&
      key !== "thrPtQueue" &&
      key !== "wipQueue" &&
      key !== "flwTmExpQueue" &&
      key !== "thrPtExpQueue" &&
      key !== "wipExpdtQueue"
    ) {
      try {
        if (typeof value !== "string") {
          value = JSON.stringify(value);
        }
        // Add the timestamp for localStorage and easyStorage
        value += "___" + Date.now().toString();
        localStorage.setItem(key, value);
        easyStorage.set(this.sid, key, value);
      } catch (e) {
        // console.error(e);
      }
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
    if (
      key !== "vQueue" &&
      key !== "flwTmQueue" &&
      key !== "thrPtQueue" &&
      key !== "wipQueue" &&
      key !== "flwTmExpQueue" &&
      key !== "thrPtExpQueue" &&
      key !== "wipExpdtQueue"
    ) {
      try {
        // Check if it already exists in localStorage
        const lSValueTimestamp /*: string | null | typeof undefined */ =
          localStorage.getItem(key);
        if (lSValueTimestamp !== null && lSValueTimestamp !== undefined) {
          let lSValue /*: string */ = lSValueTimestamp.split("___")[0];
          let lSTimestamp /*: string */ = lSValueTimestamp.split("___")[1];
          // Strings don't need to be parsed - and will throw an error
          if (lSValue !== undefined && lSTimestamp !== undefined) {
            if (isParsable(lSValue)) {
              lSValue = JSON.parse(lSValue);
            }
            // Use the value from localStorage
            this.keyValuePairs[key] = lSValue;
          }
        } else {
          // It doesn't exist in localStorage, so set it
          localStorage.setItem(
            key,
            JSON.stringify(value) + "___" + Date.now().toString(),
          );
        }
      } catch (e) {
        // console.error(e);
      }
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
