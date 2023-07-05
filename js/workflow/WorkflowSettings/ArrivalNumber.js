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
	arrivalNumber: number,
  changeArrivalNumber: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="arrivalNumber">Arrival Number:</label>
      <output
        id="arrivalNumberOutput"
        name="arrivalNumberOutput"
        for="arrivalNumber"
        >${props.arrivalNumber.toString()}</output
      >
      <input
        type="range"
        id="arrivalNumber"
        name="arrivalNumber"
        min="0"
        max="50"
        step="1"
        onChange=${props.changeArrivalNumber}
        value="${props.arrivalNumber.toString()}"
      />
    </div>
  `;
};
