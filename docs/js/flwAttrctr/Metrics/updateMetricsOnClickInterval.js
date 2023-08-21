// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../actions/gSttngs.js";
import gState from "../actions/gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import calculateTotalWipLimits from "../actions/calculateTotalWipLimits.js";
import calculateFlwTimeMax from "../actions/calculateFlwTimeMax.js";
import calculateFlwTimeAtStart from "../actions/calculateFlwTimeAtStart.js";
//------------------------------------------------------------------
// updateMetricsOnClickInterval()
//------------------------------------------------------------------
export const updateMetricsOnClickInterval = (
  setFlowTime /*: function */,
  flowTime /*: number */,
  setThruPut /*: function */,
  thruPut /*: number */,
  setThruPutPerDay /*: function */,
  throughPutPerDay /*: number */,
  setThruPutExpPerDay /*: function */,
  throughPutExpPerDay /*: number */,
  setWip /*: function */,
  wip /*: number */,
  setFlowTimeExp /*: function */,
  flowTimeExp /*: number */,
  setWipExp /*: function */,
  wipExp /*: number */,
  setValue /*: function */,
  value /*: number */,
  setTimeBox /*: function */,
  tmBox /*: number */,
  setMetricToggle /*: function */,
  metricToggle /*: boolean */,
) => {
  setInterval(() => {
    if (
      gState().get("vQueue") !== undefined &&
      gState().get("flwTmQueue") !== undefined &&
      gState().get("thrPtQueue") !== undefined &&
      gState().get("wipQueue") !== undefined &&
      gState().get("flwTmExpQueue") !== undefined &&
      gState().get("thrPtExpQueue") !== undefined &&
      gState().get("wipExpQueue") !== undefined &&
      gSttngs().get("timeBox") !== undefined
    ) {
      // Some shorter names
      const tmBox = gSttngs().get("timeBox");
      const thrPutPerDay = gState().get("thrPtQueue").dailyMean();
      const thrPutExpPerDay = gState().get("thrPtExpQueue").dailyMean();
      const thrPut =
        Math.round(thrPutExpPerDay * tmBox + thrPutPerDay * tmBox * 100) / 100;
      const flwTimeAtStart = calculateFlwTimeAtStart();
      const flwTimeMax = calculateFlwTimeMax();
      const totalWipAtStart = calculateTotalWipLimits();
      const flwTime = gState().get("flwTmQueue").flwItemMean();
      const flwTmExp = gState().get("flwTmExpQueue").flwItemMean();
      const wip = gState().get("wipQueue").dailyMean();
      const wipExp = gState().get("wipExpQueue").dailyMean();
      // Update the metrics
      setFlowTime(flwTime);
      setThruPut(thrPut);
      setThruPutPerDay(thrPutPerDay);
      setWip(wip);
      setFlowTimeExp(flwTmExp);
      setThruPutExpPerDay(thrPutExpPerDay);
      setWipExp(wipExp);
      setTimeBox((tmBox / 5).toString() + " wks");
      // Make the metrics visible
      if (flwTime > 0 && !metricToggle) {
        setMetricToggle(true);
      }
      // Caclulate the value as a percentage of the ideal throughput:
      // Little's Law = ThruPut = WIP/FlowTime
      const totalValue = gState().get("vQueue").total();
      // Before any adjustments based on flwSizeLimit, value is the same as scale
      let avrgValuePerItem = 0;
      let totalThruPut = 0;
      let displayValue = 0;
      if (
        flwTimeAtStart > 0 &&
        flwTimeMax > 0 &&
        totalWipAtStart > 0 &&
        totalValue > 0
      ) {
        avrgValuePerItem = flwTimeAtStart / flwTimeMax;
        // There is, currently, an even distribution of value across all items
        // there is a direct mapping of value to the flow time This will need to change,
        //  [a] when we have a more realistic distribution of value across items, and
        //  [b] when we have a more realistic system of assigning value to items.
        totalThruPut = (totalWipAtStart / flwTimeAtStart) * tmBox;
        displayValue = (totalValue / avrgValuePerItem / totalThruPut) * 100;
      }
      // Format the display value as a percentage
      setValue(Math.floor(displayValue).toString() + "%");
    }
  }, 1000);
};
export default updateMetricsOnClickInterval;
