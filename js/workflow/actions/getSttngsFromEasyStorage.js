// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
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
            try {
              // Check if it already exists in localStorage
              const lSValueTimestamp /*: string | null | typeof undefined */ =
                localStorage.getItem(key);
              if (lSValueTimestamp !== null && lSValueTimestamp !== undefined) {
                let lSValue /*: string */ = lSValueTimestamp.split("___")[0];
                let lSTimestamp /*: string */ =
                  lSValueTimestamp.split("___")[1];
                // If the there is a value and a timestamp
                if (lSValue !== undefined && lSTimestamp !== undefined) {
                  lSTimestampNumber = parseInt(lSTimestamp, 10);
                }
              }
            } catch (e) {
              // console.error(e);
            }
            const eSValueTimestamp = valueObj[key];
            if (eSValueTimestamp !== null && eSValueTimestamp !== undefined) {
              let eSValue /*: string */ = eSValueTimestamp.split("___")[0];
              let eSTimestamp /*: string */ = eSValueTimestamp.split("___")[1];
              if (eSValue !== undefined && eSTimestamp !== undefined) {
                eSTimestampNumber = parseInt(eSTimestamp, 10);
                // Strings don't need to be parsed - and will throw an error
                if (isParsable(eSValue)) {
                  eSValue = JSON.parse(eSValue);
                }
                // THIS IS THE WHOLE POINT OF THIS FUNCTION
                // Use the value from Easy if the timestamp is newer
                if (eSTimestampNumber >= lSTimestampNumber) {
                  // Note: This will also update localStorage
                  try {
                    gSttngs().set(key, eSValue);
                  } catch (e) {
                    // console.error(e);
                  }
                }
              }
            }
          });
        }
      });
  } catch (e) {
    console.error(e);
  }
};

export default getSttngsFromEasyStorage;
