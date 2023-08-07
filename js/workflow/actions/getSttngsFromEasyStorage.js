// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
//import readEasyStore from "./readEasyStore.js";
import readLocalStore from "./readLocalStore.js";
import easyStorage from "./easyStorage.js";
import isParsable from "./isParsable.js";
//------------------------------------------------------------------
// getSttngsFromEasyStorage()
//------------------------------------------------------------------
const getSttngsFromEasyStorage = () => {
  // So that we can tell, in the functions below, which is newer
  let lSTimestampNumber /*: number */ = 0;
  let eSTimestampNumber /*: number */ = 0;
  try {
    easyStorage
      .getAll(gSttngs().getSid())
      .then((valueObj /*: { [string]: string } | null */) => {
        if (valueObj !== null && valueObj !== undefined) {
          Object.keys(gSttngs().keyValuePairs).forEach((key /*: string */) => {
            if (valueObj[key] === undefined) {
              return;
            }
            // So that we can tell, in the functions below, which is newer
            let eSValue /*: any */ = "NOT SET IN EASY";
            let eSTimestamp /*: number */ = 0;
            let lSValue /*: any */ = "NOT SET IN LOCAL";
            let lSTimestamp /*: number */ = 0;
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
              eSTimestamp = parseInt(eSTimestampString, 10);
              // Strings don't need to be parsed - and some will throw an error
              eSValue = eSValueString;
              if (isParsable(eSValueString))
                eSValue = JSON.parse(eSValueString);
            }
            ({ lSTimestamp, lSValue } = readLocalStore(
              lSValue,
              lSTimestamp,
              key,
            ));
            // The value of eSTimestamp and lSTimestamp will be 0 if they don't
            // exist in either of the caches.
            // Use the value from Easy if the timestamp is newer
            if (eSTimestamp > lSTimestamp) {
              gSttngs().set(key, eSValue);
            }
            // Use the value from local storage if the timestamp is the
            // same or newer
            if (lSTimestamp >= eSTimestamp) {
              if (lSTimestamp === 0) {
                gSttngs().setNoCacheIfNotInLocalStorageAddToLocalStorage(
                  key,
                  lSValue,
                );
              }
            }
          });
          //------------------------------------------------------------------
          // SPECIAL CASES
          //------------------------------------------------------------------
          let lSTimestamp /*: number */ = 0;
          let lSValue /*: any */ = "NOT SET";
          ({ lSTimestamp, lSValue } = readLocalStore(
            lSValue,
            lSTimestamp,
            "autoMode",
          ));
          if (lSValue !== "NOT SET" && lSTimestamp > 0) {
            // This function is being called every second. We have to be careful not to
            // accidentally set autoMode here and overwrite the value in localStorage.
            gSttngs().setNoCacheIfNotInLocalStorageAddToLocalStorage(
              "autoMode",
              lSValue,
            );
          }
          lSTimestamp = 0;
          lSValue = "NOT SET";
          ({ lSTimestamp, lSValue } = readLocalStore(
            lSValue,
            lSTimestamp,
            "easyStorage",
          ));
          if (lSValue !== "NOT SET" && lSTimestamp > 0) {
            gSttngs().setNoCache("easyStorage", lSValue);
          }
        }
      });
  } catch (e) {
    console.error(e);
  }
};

export default getSttngsFromEasyStorage;
