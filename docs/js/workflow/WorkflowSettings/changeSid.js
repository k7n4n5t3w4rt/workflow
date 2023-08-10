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
import calculateFlwTimeMax from "../actions/calculateFlwTimeMax.js";
import touchStepsCount from "../actions/touchStepsCount.js";
import calculateDevUnits from "../actions/calculateDevUnits.js";
import calculateDevPower from "../actions/calculateDevPower.js";
//------------------------------------------------------------------
// FUNCTION: changeSid()
//------------------------------------------------------------------
export default (
    setStateFunctions /*: { [string]: (string|number|boolean) => void } */,
  ) /*: (e: SyntheticInputEvent<HTMLInputElement>) => void */ =>
  (e /*: SyntheticInputEvent<HTMLInputElement> */) /*: void */ => {
    let value = e.target.value;
    gSttngs().setSid(value);
    setStateFunctions["sid"](value);
  };
