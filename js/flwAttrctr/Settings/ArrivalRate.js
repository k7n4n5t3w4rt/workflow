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

/*::
type Props = {
	arrivalRate: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <p>The number of new work items that arrive per day. The default is 10.</p>
      <label for="arrivalRate">Arrival Rate:</label>
      <output id="arrivalRateOutput" name="arrivalRateOutput" for="arrivalRate"
        >${(props.arrivalRate || 0).toString()}</output
      >
      <input
        type="range"
        id="arrivalRate"
        name="arrivalRate"
        min="0"
        max="100"
        step=".25"
        onChange=${props.changeSetting}
        onTouchStart=${setUpdtngCnfg(true)}
        onTouchEnd=${setUpdtngCnfg(false)}
        onMouseDown=${setUpdtngCnfg(true)}
        onMouseUp=${setUpdtngCnfg(false)}
        value="${(props.arrivalRate || 0).toString()}"
      />
    </div>
  `;
};