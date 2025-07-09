// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../actions/gSttngs.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import isParsable from "../actions/isParsable";
// import calculateFlwTimeMax from "../actions/calculateFlwTimeMax";
import touchStepsCount from "../actions/touchStepsCount";
// import calculateDevUnits from "../actions/calculateDevUnits";
import calculateDevPower from "../actions/calculateDevPower";
import updateStartButtonText from "../actions/updateStartButtonText";
//------------------------------------------------------------------
// FUNCTION: changeSetting()
//------------------------------------------------------------------
export default (
    key /*: string */,
    dispatch /*: ( action: { type: "SET", payload: { key:string, value:any } },) => Object */,
  ) /*: (e: SyntheticInputEvent<HTMLInputElement>) => void */ =>
  (e /*: SyntheticInputEvent<HTMLInputElement> */) /*: void */ => {
    // Set the global keys for use in real-time, non-Preact JS
    let value;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    } else {
      value = e.target.value;
      if (isParsable(value)) {
        value = JSON.parse(value);
      }
    }
    if (value !== true && value !== false && isParsable(value)) {
      value = JSON.parse(value);
    }
    if (key === "easyStorage" || key === "autoMode") {
      gSttngs().setNoCache(key, value);
    } else {
      gSttngs().set(key, value);
    }
    const action = { type: "SET", payload: { key, value } };
    dispatch(action);

    // A little hack
    if (key === "displayName") {
      updateStartButtonText();
    }
  };
