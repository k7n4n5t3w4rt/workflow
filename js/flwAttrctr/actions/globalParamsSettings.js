// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import cleanInt from "../calculations/cleanInt.js";
import round2Places from "../calculations/round2Places.js";
import calculateDevPower from "./calculateDevPower.js";
import touchStepsCount from "./touchStepsCount.js";
//------------------------------------------------------------------
// globalParamsSettings()
//------------------------------------------------------------------
export const globalParamsSettings = async () /*: Promise<void> */ => {
  const devPowerFixParam = await gSttngs().setIfNotCached(
    "devPowerFixParam",
    false,
  );
  const dragParam = await gSttngs().setIfNotCached("dragParam", false);
  const dragPointParam = await gSttngs().setIfNotCached(
    "dragPointParam",
    false,
  );
  const paretoPointParam = await gSttngs().setIfNotCached(
    "paretoPointParam",
    true,
  );
  const arrivalRateParam = await gSttngs().setIfNotCached(
    "arrivalRateParam",
    false,
  );
  const flwTimeMinParam = await gSttngs().setIfNotCached(
    "flwTimeMinParam",
    true,
  );
  const timeBoxParam = await gSttngs().setIfNotCached("timeBoxParam", false);
  const expdtQueueLengthParam = await gSttngs().setIfNotCached(
    "expdtQueueLengthParam",
    false,
  );
  const expdtDvUnitsFactorParam = await gSttngs().setIfNotCached(
    "expdtDvUnitsFactorParam",
    false,
  );
  const flwItmSizeLimitParam = await gSttngs().setIfNotCached(
    "flwItmSizeLimitParam",
    true,
  );
  const backlogDeathParam = await gSttngs().setIfNotCached(
    "backlogDeathParam",
    false,
  );
  //------------------------------------------------------------------
  // Steps
  //------------------------------------------------------------------
  const movingWipLimitsParam = await gSttngs().setIfNotCached(
    "movingWipLimitsParam",
    false,
  );
  const movingDevUnitsParam = await gSttngs().setIfNotCached(
    "movingDevUnitsParam",
    false,
  );
  const devUnitsMoveToWorkParam = await gSttngs().setIfNotCached(
    "devUnitsMoveToWorkParam",
    false,
  );
  const staggeredStartParam = await gSttngs().setIfNotCached(
    "staggeredStartParam",
    false,
  );
  //------------------------------------------------------------------
  // Display
  //------------------------------------------------------------------
  const fpsParam = await gSttngs().setIfNotCached("fpsParam", false);
  //------------------------------------------------------------------
  return;
};
export default globalParamsSettings;
