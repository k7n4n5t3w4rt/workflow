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
        >${props.rangeMidpoint.toString()}</output
      >
      <input
        type="range"
        id="rangeMidpoint"
        name="rangeMidpoint"
        min="1"
        max="10"
        step="1"
        onChange=${props.changeSetting}
        value="${props.rangeMidpoint.toString()}"
      />
    </div>
  `;
};
