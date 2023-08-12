// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gState from "./actions/gState.js";
import gSttngs from "./actions/gSttngs.js";
//------------------------------------------------------------------
// updateStepsStateFromGlobalState()
//------------------------------------------------------------------
export const updateStepsStateFromGlobalState =
  (setSteps /*: (any) => void */) /*: () => void */ => () /*: void */ => {
    setTimeout(updateStepsStateFromGlobalState(setSteps), 1000);
    const isUpdtngCnfg = gState().get("isUpdtngCnfg");
    if (isUpdtngCnfg !== true) {
      setSteps(gSttngs().get("steps"));
    }
  };
export default updateStepsStateFromGlobalState;
