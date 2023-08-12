// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../actions/gSttngs.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import isParsable from "../actions/isParsable.js";
//------------------------------------------------------------------
// changeStepActualFlwTime()
//------------------------------------------------------------------
export const changeStepActualFlwTime =
  (
    setSteps /*: (any) => void */,
    index /*: number */,
  ) /*: (e: SyntheticInputEvent<HTMLInputElement>) => void */ =>
  (e /*: SyntheticInputEvent<HTMLInputElement> */) /*: void */ => {
    let value = e.target.value;
    if (isParsable(value)) {
      value = JSON.parse(value);
    }
    const steps = [...gSttngs().get("steps")];
    const step = steps[index];
    step.actualFlwTime = value;
    gSttngs().set("steps", steps);
    setSteps(steps);
  };
export default changeStepActualFlwTime;
