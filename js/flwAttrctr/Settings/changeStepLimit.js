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
// changeStepLimit()
//------------------------------------------------------------------
export const changeStepLimit =
  (
    setSteps /*: (any) => void */,
    index /*: number */,
  ) /*: (e:SyntheticInputEvent<HTMLInputElement>) => void */ =>
  (e /*: SyntheticInputEvent<HTMLInputElement> */) => {
    let value = e.target.value;
    if (isParsable(value)) {
      value = JSON.parse(value);
    }
    const steps = [...gSttngs().get("steps")];
    const step = steps[index];
    step.limit = value;
    step.movingLimit = value;
    gSttngs().set("steps", steps);
    setSteps(steps);
  };
export default changeStepLimit;
