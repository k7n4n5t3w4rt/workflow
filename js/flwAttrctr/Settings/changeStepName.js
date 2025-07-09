// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../actions/gSttngs.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import isParsable from "../actions/isParsable";
//------------------------------------------------------------------
// changeStepName()
//------------------------------------------------------------------
export const changeStepName =
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
    step.name = value;
    gSttngs().set("steps", steps);
    const action = { type: "SET", payload: { key: "steps", value: steps } };
    dispatch(action);
  };
export default changeStepName;
