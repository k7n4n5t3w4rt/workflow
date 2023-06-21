// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// theNonDead()
//------------------------------------------------------------------
export default (
    removeFlowItem /*: (flwItem:FlwItem,index:number) => void */,
  ) /*: (flwItem:FlwItem, index:number) => boolean */ =>
  (flwItem /*: FlwItem */, index /*:number */) /*: boolean */ => {
    if (
      gSttngs().backlogDeath > 0 &&
      flwItem.dBacklogAge >= gSttngs().backlogDeath
    ) {
      // console.log("theNonDead: Filtering out this flwItem");
      removeFlowItem(flwItem, index);
      return false;
    }
    if (gSttngs().death > 0 && flwItem.dAge >= gSttngs().death) {
      // console.log("theNonDead: Filtering out this flwItem");
      removeFlowItem(flwItem, index);
      return false;
    }
    return true;
  };
