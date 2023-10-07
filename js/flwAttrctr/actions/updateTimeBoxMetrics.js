// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import calculateTotalWipLimits from "./calculateTotalWipLimits.js";
import calculateFlwTimeMax from "./calculateFlwTimeMax.js";
import calculateFlwTimeAtStart from "./calculateFlwTimeAtStart.js";
import updateStepMetrics from "./updateStepMetrics.js";
//------------------------------------------------------------------
// FUNCTION: updateTimeBoxMetrics()
//------------------------------------------------------------------
export const updateTimeBoxMetrics = () => {
  if (
    gState().get("vQueue") !== undefined &&
    gState().get("thrPtQueue") !== undefined &&
    gState().get("thrPtExpQueue") !== undefined &&
    gState().get("thrPut") !== undefined &&
    gSttngs().get("timeBox") !== undefined &&
    gState().get("scnData") !== undefined
  ) {
    // Some shorter names
    const tmBox = gSttngs().get("timeBox");
    gState().set("tmBox", (tmBox / 5).toString() + " wks");
    const thrPutPerDay = gState().get("thrPtQueue").dailyMean();
    const thrPutExpPerDay = gState().get("thrPtExpQueue").dailyMean();
    const thrPut =
      Math.round(thrPutExpPerDay * tmBox + thrPutPerDay * tmBox * 100) / 100;
    gState().set("thrPut", thrPut);
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
        (idealThruPutBasedOnActualValue / idealTotalThruPutBasedOnLittlesLaw) *
        100;
      // Format the display value as a percentage
      gState().set("value", Math.floor(displayValue).toString() + "%");
    } else {
      gState().set("value", "NA");
    }
    const scnData = gState().get("scnData");
    if (scnData === undefined || scnData.stpMetrics === undefined) {
      return;
    }
    scnData.stpMetrics.forEach((stpMetrics) => {
      updateStepMetrics(stpMetrics);
    });
  }
};
export default updateTimeBoxMetrics;
