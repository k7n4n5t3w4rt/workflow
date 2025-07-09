// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../actions/gSttngs.js";
import gState from "../actions/gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import calculateTotalWipLimits from "../actions/calculateTotalWipLimits";
import calculateFlwTimeMax from "../actions/calculateFlwTimeMax";
import calculateFlwTimeAtStart from "../actions/calculateFlwTimeAtStart";
import updateStepMetrics from "../actions/updateStepMetrics";
//------------------------------------------------------------------
// updateMetricsOnClickInterval()
//------------------------------------------------------------------
export const updateMetricsOnClickInterval = (
  setFlowTime /*: function */,
  setThruPut /*: function */,
  setThruPutPerDay /*: function */,
  setThruPutExpPerDay /*: function */,
  setWip /*: function */,
  setFlowTimeExp /*: function */,
  setWipExp /*: function */,
  setValue /*: function */,
  setTimeBox /*: function */,
  setMetricToggle /*: function */,
  metricToggle /*: boolean */,
) => {
  setInterval(() => {
    if (
      gState().get("tmBox") !== undefined &&
      gState().get("thrPutPerDay") !== undefined &&
      gState().get("thrPutExpPerDay") !== undefined &&
      gState().get("thrPut") !== undefined &&
      gState().get("flwTime") !== undefined &&
      gState().get("flwTmExp") !== undefined &&
      gState().get("wip") !== undefined &&
      gState().get("wipExp") !== undefined &&
      gState().get("value") !== undefined &&
      gState().get("started") !== undefined
    ) {
      // Some shorter names

      setTimeBox(gState().get("tmBox"));
      setThruPutPerDay(gState().get("thrPutPerDay"));
      setThruPutExpPerDay(gState().get("thrPutExpPerDay"));
      setThruPut(gState().get("thrPut"));
      setFlowTime(gState().get("flwTime"));
      setFlowTimeExp(gState().get("flwTmExp"));
      setWip(gState().get("wip"));
      setWipExp(gState().get("wipExp"));
      setValue(gState().get("value"));
      // Make the metrics visible
      if (gState().get("started") === true && !metricToggle) {
        setMetricToggle(true);
      } else {
        setMetricToggle(false);
      }
    }
  }, 1000 / gSttngs().get("fps"));
};
export default updateMetricsOnClickInterval;
