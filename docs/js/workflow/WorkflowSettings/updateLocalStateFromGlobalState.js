// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../actions/gSttngs.js";
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
    // Not implimented yet
    setStateFunctions["showMetrics"](gSttngs().get("showMetrics"));
    setStateFunctions["debug"](gSttngs().get("debug"));
    setStateFunctions["dfntnOfReady"](gSttngs().get("dfntnOfReady"));
    //----------------------------------------
    // Sliders
    //----------------------------------------
    setStateFunctions["arrivalRate"](gSttngs().get("arrivalRate"));
    setStateFunctions["avrgFlwTimeAtStart"](
      gSttngs().get("avrgFlwTimeAtStart"),
    );
    setStateFunctions["flwTimeMin"](gSttngs().get("flwTimeMin"));
    setStateFunctions["flwTimeMax"](gSttngs().get("flwTimeMax"));
    setStateFunctions["devUnits"](gSttngs().get("devUnits"));
    setStateFunctions["devPowerFactor"](gSttngs().get("devPowerFactor"));
    setStateFunctions["timeBox"](gSttngs().get("timeBox"));
    setStateFunctions["fps"](gSttngs().get("fps"));
    setStateFunctions["expdtQueueLength"](gSttngs().get("expdtQueueLength"));
    setStateFunctions["expdtDvUnitsFactor"](
      gSttngs().get("expdtDvUnitsFactor"),
    );
    setStateFunctions["scaleCm"](gSttngs().get("scaleCm"));
    setStateFunctions["rangeMax"](gSttngs().get("rangeMax"));
    setStateFunctions["rangeIncreaseRate"](gSttngs().get("rangeIncreaseRate"));
    setStateFunctions["rangeMidpoint"](gSttngs().get("rangeMidpoint"));
    setStateFunctions["devPowerFix"](gSttngs().get("devPowerFix"));
    // Not implimented yet
    setStateFunctions["flwItmSizeLimit"](gSttngs().get("flwItmSizeLimit"));
    setStateFunctions["backlogDeath"](gSttngs().get("backlogDeath"));
    setStateFunctions["death"](gSttngs().get("death"));
    setStateFunctions["specialisation"](gSttngs().get("specialisation"));
    setStateFunctions["teamInstability"](gSttngs().get("teamInstability"));
  };

export default updateLocalStateFromGlobalState;
