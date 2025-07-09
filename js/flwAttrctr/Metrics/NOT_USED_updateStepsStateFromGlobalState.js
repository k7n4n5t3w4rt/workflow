// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gState from "../actions/gState.js";
import gSttngs from "../actions/gSttngs.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import getFlwMpSteps from "../actions/getFlwMpSteps";
//------------------------------------------------------------------
// FUNCTION: updateStepsStateFromGlobalState()
//------------------------------------------------------------------
export const updateStepsStateFromGlobalState = () /*: void */ => {
  const isUpdtngCnfg = gState().get("isUpdtngCnfg");
  if (isUpdtngCnfg === true) {
    return;
  }
  const steps = gSttngs().get("steps");
  getFlwMpSteps().forEach((flwMpStep /*: FlwItem[] */, index /*: number */) => {
    if (steps[index] === undefined) return;
    steps[index].avAge = 0;
    const flwItemAges /*: Array<number> */ = [];
    flwMpStep.forEach((flwItem /*: FlwItem */) => {
      flwItemAges.push(flwItem.dStepsAges[index.toString()]);
    });
    const avAge =
      flwItemAges.reduce((acc, num) => acc + num, 0) / flwItemAges.length;
    if (isNaN(avAge)) return;
    steps[index].avAge = Math.round(avAge * 100) / 100;
  });
  gState().set("steps", steps);
};
export default updateStepsStateFromGlobalState;
