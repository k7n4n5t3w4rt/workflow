// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import easyStorage from "./easyStorage.js";
//------------------------------------------------------------------
// getSttngsFromEasyStorage()
//------------------------------------------------------------------
export default () => {
  Object.keys(gSttngs().keyValuePairs).forEach((key /*: string */) => {
    if (easyStorage.get(key) !== undefined) {
      easyStorage.get(key).then((value /*: string */) => {
        if (value !== null && value !== undefined) {
          if (value !== gSttngs().get(key)) {
            gSttngs().set(key, value);
          }
        }
      });
    }
  });
};
