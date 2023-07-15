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

/*::
type Props = {
	arrivalRate: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="arrivalRate">Arrival Rate:</label>
      <output id="arrivalRateOutput" name="arrivalRateOutput" for="arrivalRate"
        >${props.arrivalRate.toString()}</output
      >
      <input
        type="range"
        id="arrivalRate"
        name="arrivalRate"
        min="0"
        max="20"
        step="1"
        onChange=${props.changeSetting}
        value="${props.arrivalRate.toString()}"
      />
    </div>
  `;
};
