// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// theNonDead()
//------------------------------------------------------------------
export default (
    removeFlowItem /*: (flwItem:FlwItem) => void */,
    removeDoneFlwItmsFromFlwMap /*: (_:null|void, flwItem:FlwItem, index:number) => void */,
  ) /*: (flwItem:FlwItem, index:number) => boolean */ =>
  (flwItem /*: FlwItem */, index /*:number */) /*: boolean */ => {
    if (
      gSttngs().get("backlogDeath") > 0 &&
      flwItem.dStepsAges["0"] >= gSttngs().get("backlogDeath")
    ) {
      removeFlowItem(flwItem);
      removeDoneFlwItmsFromFlwMap(null, flwItem, index);

      return false;
    }
    if (gSttngs().get("death") > 0 && flwItem.dAge >= gSttngs().get("death")) {
      removeFlowItem(flwItem);
      removeDoneFlwItmsFromFlwMap(null, flwItem, index);
      return false;
    }
    return true;
  };
