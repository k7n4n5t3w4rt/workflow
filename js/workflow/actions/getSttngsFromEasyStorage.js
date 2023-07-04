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
  Object.keys(gSttngs().keyValuePairs).forEach((key /*: string */) => {
    easyStorage
      .get(gSttngs().getSid(), key)
      .then((valueObj /*: { [string]: string } */) => {
        if (
          valueObj[key] !== null &&
          valueObj[key] !== undefined &&
          valueObj[key] !== gSttngs().get(key) &&
          isParsable(valueObj[key])
        ) {
          gSttngs().set(key, JSON.parse(valueObj[key]));
        }
      });
  });
  setTimeout(getSttngsFromEasyStorage, 1000 / gSttngs().get("fps"));
};

export default getSttngsFromEasyStorage;
