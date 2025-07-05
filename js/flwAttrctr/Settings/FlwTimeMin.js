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
// FUNCTION: FlwTimeMin
//------------------------------------------------------------------
/*::
type Props = {
	flwTimeMin: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <p>The minimum time a work item can take to complete, in days.</p>
      <label for="flwTimeMin">Flow Time Min.:</label>
      <output id="flwTimeMinOutput" name="flwTimeMinOutput" for="flwTimeMin"
        >${(props.flwTimeMin || 0).toString()}</output
      >
      <input
        type="range"
        id="flwTimeMin"
        name="flwTimeMin"
        min="1"
        max="200"
        step="1"
        onChange=${props.changeSetting}
        onTouchStart=${setUpdtngCnfg(true)}
        onTouchEnd=${setUpdtngCnfg(false)}
        onMouseDown=${setUpdtngCnfg(true)}
        onMouseUp=${setUpdtngCnfg(false)}
        value="${(props.flwTimeMin || 0).toString()}"
      />
    </div>
  `;
};