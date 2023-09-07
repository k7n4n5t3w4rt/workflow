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
// FUNCTION: RangeMidpoint
//------------------------------------------------------------------
/*::
type Props = {
	rangeMidpoint: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="rangeMidpoint">Range Midpoint:</label>
      <output
        id="rangeMidpointOutput"
        name="rangeMidpointOutput"
        for="rangeMidpoint"
        >${(props.rangeMidpoint || 0).toString()}</output
      >
      <input
        type="range"
        id="rangeMidpoint"
        name="rangeMidpoint"
        min="0.05"
        max="0.5"
        step="0.05"
        onChange=${props.changeSetting}
        onTouchStart=${setUpdtngCnfg(true)}
        onTouchEnd=${setUpdtngCnfg(false)}
        onMouseDown=${setUpdtngCnfg(true)}
        onMouseUp=${setUpdtngCnfg(false)}
        value="${(props.rangeMidpoint || 0).toString()}"
      />
    </div>
  `;
};
