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
    // Not implimented yet
    setStateFunctions["showMetrics"](gSttngs().get("showMetrics"));
    setStateFunctions["debug"](gSttngs().get("debug"));
    setStateFunctions["dfntnOfReady"](gSttngs().get("dfntnOfReady"));
    //----------------------------------------
    // Sliders
    //----------------------------------------
    setStateFunctions["arrivalRate"](gSttngs().get("arrivalRate"));
    setStateFunctions["flwItmSizeMin"](gSttngs().get("flwItmSizeMin"));
    setStateFunctions["flwItmSizeMax"](gSttngs().get("flwItmSizeMax"));
    setStateFunctions["devUnits"](gSttngs().get("devUnits"));
    setStateFunctions["devCapacityAvailable"](
      gSttngs().get("devCapacityAvailable"),
    );
    setStateFunctions["drag"](gSttngs().get("drag"));
    setStateFunctions["timeBox"](gSttngs().get("timeBox"));
    setStateFunctions["death"](gSttngs().get("death"));
    setStateFunctions["backlogDeath"](gSttngs().get("backlogDeath"));
    setStateFunctions["flwItmSizeFactor"](gSttngs().get("flwItmSizeFactor"));
    setStateFunctions["fps"](gSttngs().get("fps"));
    setStateFunctions["expdtQueueLength"](gSttngs().get("expdtQueueLength"));
    setStateFunctions["wipLimitEachStep"](gSttngs().get("wipLimitEachStep"));
    setStateFunctions["expdtDvUnitsFactor"](
      gSttngs().get("expdtDvUnitsFactor"),
    );
    setStateFunctions["scaleCm"](gSttngs().get("scaleCm"));
    // Not implimented yet
    setStateFunctions["specialisation"](gSttngs().get("specialisation"));
    setStateFunctions["teamInstability"](gSttngs().get("teamInstability"));
  };

export default updateLocalStateFromGlobalState;
