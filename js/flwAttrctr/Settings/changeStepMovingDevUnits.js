// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../actions/gSttngs.js";
import gState from "../actions/gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import calculateDevUnits from "../actions/calculateDevUnits.js";
import calculateMovingDevUnits from "../actions/calculateMovingDevUnits.js";
import isParsable from "../actions/isParsable.js";
//------------------------------------------------------------------
// changeStepDevUnits()
//------------------------------------------------------------------
export const changeStepDevUnits =
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
    const oldMovingDevUnitsValue = step.movingDevUnits;
    step.movingDevUnits = value;
    gSttngs().set("steps", steps);
    let movingDevUnits = calculateMovingDevUnits();
    let devUnits = calculateDevUnits();
    if (movingDevUnits > devUnits) {
      // First, set it back to the old value
      step.movingDevUnits = oldMovingDevUnitsValue;
      gSttngs().set("steps", steps);
      // Recalculate the movingDevUnits and devUnits
      movingDevUnits = calculateMovingDevUnits();
      devUnits = calculateDevUnits();
      // Then, set the new value to be the difference
      step.movingDevUnits += devUnits - movingDevUnits;
      gSttngs().set("steps", steps);
    }
    setSteps(steps);
  };
export default changeStepDevUnits;
