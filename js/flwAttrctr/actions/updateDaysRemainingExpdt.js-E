// @flow
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import { numberExpiditedDevUnits } from "./numberDevUnits.js";
import applyDevCapacityAllFlwItems from "./applyDevCapacityAllFlwItems.js";
//------------------------------------------------------------------
// updateDaysRemaining()
//------------------------------------------------------------------
export default (
  flwItems /*: FlwItem[] */,
  spareDevDays /*: SpareDevDays */ = {},
  usingSpareDevDays /*: boolean */ = false,
) /*: void */ => {
  const expdtFlwItems = flwItems.filter(
    (flwItem /*: FlwItem */) /*: boolean */ => {
      return flwItem.dExpedite === true;
    },
  );
  // const nmExpdtDvUnits = numberExpiditedDevUnits();
  const expediteFlag /*: boolean */ = true;
  applyDevCapacityAllFlwItems(
    expdtFlwItems,
    expediteFlag,
    spareDevDays,
    usingSpareDevDays,
  );
};
