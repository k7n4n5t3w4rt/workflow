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
import updateStepMetrics from "../actions/updateStepMetrics.js";
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
      gSttngs().get("timeBox") !== undefined &&
      gState().get("scnData") !== undefined
    ) {
      // Some shorter names
      const tmBox = gSttngs().get("timeBox");
      setTimeBox((tmBox / 5).toString() + " wks");
      const thrPutPerDay = gState().get("thrPtQueue").dailyMean();
      setThruPutPerDay(thrPutPerDay);
      const thrPutExpPerDay = gState().get("thrPtExpQueue").dailyMean();
      setThruPutExpPerDay(thrPutExpPerDay);
      const thrPut =
        Math.round(thrPutExpPerDay * tmBox + thrPutPerDay * tmBox * 100) / 100;
      setThruPut(thrPut);
      const flwTime = gState().get("flwTmQueue").flwItemMean();
      setFlowTime(flwTime);
      const flwTmExp = gState().get("flwTmExpQueue").flwItemMean();
      setFlowTimeExp(flwTmExp);
      const wip = gState().get("wipQueue").dailyMean();
      setWip(wip);
      const wipExp = gState().get("wipExpQueue").dailyMean();
      setWipExp(wipExp);
      // Update the metrics
      // Make the metrics visible
      if (gState().get("started") === true && !metricToggle) {
        setMetricToggle(true);
      } else {
        setMetricToggle(false);
      }
      const flwTimeAtStart = calculateFlwTimeAtStart();
      const flwTimeMax = calculateFlwTimeMax();
      const totalWipAtStart = calculateTotalWipLimits();
      let avrgValuePerItem = 0;
      let idealTotalThruPutBasedOnLittlesLaw = 0;
      let displayValue = 0;
      const totalValue = gState().get("vQueue").total();
      // Caclulate the value as a percentage of the ideal throughput.
      // Little's Law = ThruPut = WIP/FlowTime
      // Before any adjustments based on flwSizeLimit, value is the same as scale
      if (flwTimeMax > 0) {
        avrgValuePerItem = flwTimeAtStart / flwTimeMax;
      }
      // There is, currently, an even distribution of value across all items
      // there is a direct mapping of value to the flow time This will need to change,
      //  [a] when we have a more realistic distribution of value across items, and
      //  [b] when we have a more realistic system of assigning value to items.
      if (flwTimeAtStart > 0) {
        idealTotalThruPutBasedOnLittlesLaw =
          (totalWipAtStart / flwTimeAtStart) * tmBox;
      }
      if (idealTotalThruPutBasedOnLittlesLaw > 0 && avrgValuePerItem > 0) {
        const idealThruPutBasedOnActualValue = totalValue / avrgValuePerItem;
        displayValue =
          (idealThruPutBasedOnActualValue /
            idealTotalThruPutBasedOnLittlesLaw) *
          100;
        // Format the display value as a percentage
        setValue(Math.floor(displayValue).toString() + "%");
      } else {
        setValue("NA");
      }
      const scnData = gState().get("scnData");
      if (scnData === undefined || scnData.stpMetrics === undefined) {
        return;
      }
      scnData.stpMetrics.forEach((stpMetrics) => {
        updateStepMetrics(stpMetrics);
      });
    }
    //}, (1000 / gSttngs().get("fps")) * gSttngs().get("timeBox"));
  }, (1000 / gSttngs().get("fps")) * 5);
};
export default updateMetricsOnClickInterval;
