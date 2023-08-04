// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../actions/gSttngs.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import isParsable from "../actions/isParsable.js";
import calculateFlwTimeMax from "../actions/calculateFlwTimeMax.js";
import touchStepsCount from "../actions/touchStepsCount.js";
import calculateDevUnits from "../actions/calculateDevUnits.js";
import calculateDevPower from "../actions/calculateDevPower.js";
//------------------------------------------------------------------
// FUNCTION: changeSetting()
//------------------------------------------------------------------
export default (
    setting /*: string */,
    setStateFunctions /*: { [string]: (string|number|boolean) => void } */,
  ) /*: (e: SyntheticInputEvent<HTMLInputElement>) => void */ =>
  (e /*: SyntheticInputEvent<HTMLInputElement> */) /*: void */ => {
    // Set the global settings for use in real-time, non-Preact JS
    let value = e.target.value;
    if (isParsable(value)) {
      value = JSON.parse(value);
    }
    if (setting === "easyStorage" || setting === "autoMode") {
      gSttngs().setNoCache(setting, value);
    } else {
      gSttngs().set(setting, value);
    }
    setStateFunctions[setting](value);
    // calculateFlwTimeMax();
    // touchStepsCount();
    // calculateDevUnits();
    // calculateDevPower();
  };
