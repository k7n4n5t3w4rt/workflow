// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../actions/gSttngs.js";
import gState from "../actions/gState.js";
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import {
  useEffect,
  useState,
  useReducer,
} from "../../../web_modules/preact/hooks.js";
import { html } from "../../../web_modules/htm/preact.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import {
  isParsableAsNumber,
  isParsableAsBoolean,
  isParsableAsArray,
} from "../actions/isParsable.js";
import setUpdtngCnfg from "./setUpdtngCnfg.js";
//------------------------------------------------------------------
// FUNCTION: RangeIncreaseRate
//------------------------------------------------------------------
/*::
type Props = {
	rangeIncreaseRate: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <p>The rate at which the range of the random distribution increases.</p>
      <label for="rangeIncreaseRate">Range Increase Rate:</label>
      <output
        id="rangeIncreaseRateOutput"
        name="rangeIncreaseRateOutput"
        for="rangeIncreaseRate"
        >${(props.rangeIncreaseRate || 0).toString()}</output
      >
      <input
        type="range"
        id="rangeIncreaseRate"
        name="rangeIncreaseRate"
        min="0.1"
        max="1"
        step="0.1"
        onChange=${props.changeSetting}
        onTouchStart=${setUpdtngCnfg(true)}
        onTouchEnd=${setUpdtngCnfg(false)}
        onMouseDown=${setUpdtngCnfg(true)}
        onMouseUp=${setUpdtngCnfg(false)}
        value="${(props.rangeIncreaseRate || 0).toString()}"
      />
    </div>
  `;
};