// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import removeFlowItem from "./removeFlowItem";
import removeDoneFlwItmsFromFlwMap from "./click.js_removeDoneFlwItmsFromFlwMap";
//------------------------------------------------------------------
// theNonDead()
//------------------------------------------------------------------
export const theNonDead = (
  flwItem /*: FlwItem */,
  index /*:number */,
) /*: boolean */ => {
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
export default theNonDead;
