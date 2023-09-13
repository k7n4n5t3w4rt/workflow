// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// theNonDead()
//------------------------------------------------------------------
export default (
    removeDoneFlwItmsFromFlwMap /*: (_:null|void, flwItem:CbInstance, index:number) => void */,
  ) /*: (flwItem:CbInstance, index:number) => boolean */ =>
  (flwItem /*: CbInstance */, index /*:number */) /*: boolean */ => {
    const inctvInstances = gState().get("inctvInstances");
    if (
      gSttngs().get("backlogDeath") > 0 &&
      flwItem.dStepsAges["0"] >= gSttngs().get("backlogDeath")
    ) {
      inctvInstances.push(flwItem);
      // Maybe we should be setting the scale and all other props back to the default
      removeDoneFlwItmsFromFlwMap(null, flwItem, index);

      return false;
    }
    if (gSttngs().get("death") > 0 && flwItem.dAge >= gSttngs().get("death")) {
      inctvInstances.push(flwItem);
      // Maybe we should be setting the scale and all other props back to the default
      removeDoneFlwItmsFromFlwMap(null, flwItem, index);
      return false;
    }
    return true;
  };
