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
	flwTimeMin: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="flwTimeMin">Flow Time Min.:</label>
      <output id="flwTimeMinOutput" name="flwTimeMinOutput" for="flwTimeMin"
        >${props.flwTimeMin.toString()}</output
      >
      <input
        type="range"
        id="flwTimeMin"
        name="flwTimeMin"
        min="1"
        max="200"
        step="1"
        onChange=${props.changeSetting}
        value="${props.flwTimeMin.toString()}"
      />
    </div>
  `;
};
