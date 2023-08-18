// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../actions/gSttngs.js";
import gState from "../actions/gState.js";
//------------------------------------------------------------------
// FUNCTION: updateLocalStateFromGlobalState()
//------------------------------------------------------------------
const updateLocalStateFromGlobalState =
  (setStateFunctions /*: {[string]: function} */) /*: () => void */ =>
  () /*: void */ => {
    // This function calls itself every second to update the local state
    setTimeout(updateLocalStateFromGlobalState(setStateFunctions), 1000);
    const isUpdtngCnfg = gState().get("isUpdtngCnfg");
    if (isUpdtngCnfg === true) {
      return;
    }
    //----------------------------------------
    // Boolean
    //----------------------------------------
    setStateFunctions["autoMode"](gSttngs().get("autoMode"));
    //----------------------------------------
    // Sharing
    //----------------------------------------
    setStateFunctions["sid"](gSttngs().getSid());
    //----------------------------------------
    // Sliders
    //----------------------------------------
    setStateFunctions["fps"](gSttngs().get("fps"));
    setStateFunctions["flwItmSizeLimit"](gSttngs().get("flwItmSizeLimit"));
    setStateFunctions["paramsMaxWip"](gSttngs().get("paramsMaxWip"));
    // setStateFunctions["scaleCm"](gSttngs().get("scaleCm"));
    // setStateFunctions["rangeMax"](gSttngs().get("rangeMax"));
    // setStateFunctions["rangeIncreaseRate"](gSttngs().get("rangeIncreaseRate"));
    // setStateFunctions["rangeMidpoint"](gSttngs().get("rangeMidpoint"));
  };

export default updateLocalStateFromGlobalState;
