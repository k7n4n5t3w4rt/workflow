// @flow
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import { numberExpiditedDevUnits } from "./numberDevUnits.js";
import applyAdjustedReduction from "./applyAdjustedReduction.js";
import stepWip from "./stepWip.js";
//------------------------------------------------------------------
// updateDaysRemaining()
//------------------------------------------------------------------
export default (flwItems /*: FlwItem[] */) /*: void */ => {
  const expdtFlwItems = flwItems.filter(
    (flwItem /*: FlwItem */) /*: boolean */ => {
      return flwItem.dExpedite === true;
    },
  );
  const nmExpdtDvUnits = numberExpiditedDevUnits();
  applyAdjustedReduction(stepWip)(expdtFlwItems, nmExpdtDvUnits);
};
