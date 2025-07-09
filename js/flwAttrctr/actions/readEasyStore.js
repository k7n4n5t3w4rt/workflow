// @flow
//---------------------------------------------------------------------------
// IMPORT: HELPERS
//---------------------------------------------------------------------------
import easyStorage from "./easyStorage.js";
import isParsable from "./isParsable.js";
//---------------------------------------------------------------------------
// readEasyStore()
//---------------------------------------------------------------------------
export const readEasyStore = (
  sid /*: string */,
  eSTimestamp /*: number */,
  eSValue /*: any */,
  key /*: string */,
) /*: Promise<{ eSTimestamp:number, eSValue: any }> */ => {
  return easyStorage
    .get(sid, key)
    .then((valueObj /*: {[string]:string} | null */) => {
      // First, check that we got something out of easyStorage
      if (
        valueObj !== null &&
        valueObj !== undefined &&
        valueObj[key] !== undefined
      ) {
        const eSValueTimestamp = valueObj[key];
        // Split the string into value and timestamp
        const eSValueString /*: string */ = eSValueTimestamp.split("___")[0];
        const eSTimestampString /*: string */ =
          eSValueTimestamp.split("___")[1];
        // Check that we got a value and a timestamp
        if (eSValueString !== undefined && eSTimestampString !== undefined) {
          // Strings don't need to be parsed - and some will throw an error
          if (isParsable(eSValueString) && isParsable(eSTimestampString)) {
            eSTimestamp = parseInt(eSTimestampString, 10);
            eSValue = JSON.parse(eSValueString);
          }
        }
      }
      return { eSTimestamp, eSValue };
    })
    .catch((e /*: Error */) => {
      console.error(e.message);
      return { eSTimestamp, eSValue };
    });
};
export default readEasyStore;
