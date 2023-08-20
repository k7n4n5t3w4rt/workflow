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
    //----------------------------------------
    // Boolean
    //----------------------------------------
    setStateFunctions["autoMode"](gSttngs().get("autoMode"));
    setStateFunctions["easyStorage"](gSttngs().get("easyStorage"));
    //----------------------------------------
    // Sharing
    //----------------------------------------
    setStateFunctions["sid"](gSttngs().getSid());
    //----------------------------------------
    // Sliders
    //----------------------------------------
    // Not implimented yet
    setStateFunctions["arrivalRate"](gSttngs().get("arrivalRate"));
    setStateFunctions["backlogDeath"](gSttngs().get("backlogDeath"));
    setStateFunctions["death"](gSttngs().get("death"));
    setStateFunctions["devPowerFix"](gSttngs().get("devPowerFix"));
    setStateFunctions["devUnits"](gSttngs().get("devUnits"));
    setStateFunctions["drag"](gSttngs().get("drag"));
    setStateFunctions["expdtDvUnitsFactor"](
      gSttngs().get("expdtDvUnitsFactor"),
    );
    setStateFunctions["expdtQueueLength"](gSttngs().get("expdtQueueLength"));
    setStateFunctions["flwItmSizeLimit"](gSttngs().get("flwItmSizeLimit"));
    setStateFunctions["flwTimeMin"](gSttngs().get("flwTimeMin"));
    setStateFunctions["fps"](gSttngs().get("fps"));
    setStateFunctions["numberOfSteps"](gSttngs().get("numberOfSteps"));
    setStateFunctions["paramsMaxWip"](gSttngs().get("paramsMaxWip"));
    setStateFunctions["paretoPoint"](gSttngs().get("paretoPoint"));
    setStateFunctions["rangeIncreaseRate"](gSttngs().get("rangeIncreaseRate"));
    setStateFunctions["rangeMax"](gSttngs().get("rangeMax"));
    setStateFunctions["rangeMidpoint"](gSttngs().get("rangeMidpoint"));
    setStateFunctions["scaleCm"](gSttngs().get("scaleCm"));
    setStateFunctions["timeBox"](gSttngs().get("timeBox"));
    // setStateFunctions["specialisation"](gSttngs().get("specialisation"));
    // setStateFunctions["teamInstability"](gSttngs().get("teamInstability"));
    // setStateFunctions["showMetrics"](gSttngs().get("showMetrics"));
    // setStateFunctions["debug"](gSttngs().get("debug"));
    // setStateFunctions["dfntnOfReady"](gSttngs().get("dfntnOfReady"));
  };

export default updateLocalStateFromGlobalState;
