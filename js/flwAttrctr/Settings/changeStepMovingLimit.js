// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../actions/gSttngs.js";
import gState from "../actions/gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import isParsable from "../actions/isParsable.js";
//------------------------------------------------------------------
// changeStepMovingLimit()
//------------------------------------------------------------------
export const changeStepMovingLimit =
  (
    index /*: number */,
    dispatch /*: ( action: { type: "SET", payload: { key:string, value:any } },) => Object */,
  ) /*: (e: SyntheticInputEvent<HTMLInputElement>) => void */ =>
  (e /*: SyntheticInputEvent<HTMLInputElement> */) /*: void */ => {
    let value = e.target.value;
    if (isParsable(value)) {
      value = JSON.parse(value);
    }
    const steps = [...gSttngs().get("steps")];
    const step = steps[index];
    step.movingLimit = value;
    gSttngs().set("steps", steps);
    const action = { type: "SET", payload: { key: "steps", value: steps } };
    dispatch(action);
  };
export default changeStepMovingLimit;
