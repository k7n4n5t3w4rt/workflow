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
// FUNCTION: updateClickMetrics()
//------------------------------------------------------------------
export const updateClickMetrics = () => {
  if (
    gState().get("flwTmQueue") !== undefined &&
    gState().get("thrPtQueue") !== undefined &&
    gState().get("wipQueue") !== undefined &&
    gState().get("flwTmExpQueue") !== undefined &&
    gState().get("thrPtExpQueue") !== undefined &&
    gState().get("wipExpQueue") !== undefined &&
    gState().get("scnData") !== undefined
  ) {
    // Some shorter names
    const thrPutPerDay = gState().get("thrPtQueue").dailyMean();
    gState().set("thrPutPerDay", thrPutPerDay);
    const thrPutExpPerDay = gState().get("thrPtExpQueue").dailyMean();
    gState().set("thrPutExpPerDay", thrPutExpPerDay);
    // console.log("Clicks:", gState().get("clicks"));
    const flwTime = gState().get("flwTmQueue").flwItemMean();
    gState().set("flwTime", flwTime);
    // console.log(`updateClickMetrics(): Resetting flwTime to ${flwTime}`);
    const flwTmExp = gState().get("flwTmExpQueue").flwItemMean();
    gState().set("flwTmExp", flwTmExp);
    const wip = gState().get("wipQueue").dailyMean();
    gState().set("wip", wip);
    const wipExp = gState().get("wipExpQueue").dailyMean();
    gState().set("wipExp", wipExp);
  }
};
export default updateClickMetrics;
