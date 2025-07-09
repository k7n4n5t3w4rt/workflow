// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs";
import gState from "./gState";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import calculateTotalWipLimits from "./calculateTotalWipLimits";
import calculateFlwTimeMax from "./calculateFlwTimeMax";
import calculateFlwTimeAtStart from "./calculateFlwTimeAtStart";
import updateStepMetrics from "./updateStepMetrics";
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
    const flwTime = gState().get("flwTmQueue").flwItemMean();
    gState().set("flwTime", flwTime);
    const flwTmExp = gState().get("flwTmExpQueue").flwItemMean();
    gState().set("flwTmExp", flwTmExp);
    const wip = gState().get("wipQueue").dailyMean();
    gState().set("wip", wip);
    const wipExp = gState().get("wipExpQueue").dailyMean();
    gState().set("wipExp", wipExp);
  }
};
export default updateClickMetrics;
