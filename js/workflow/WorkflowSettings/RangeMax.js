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
	rangeMax: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="rangeMax">Range Max:</label>
      <output id="rangeMaxOutput" name="rangeMaxOutput" for="rangeMax"
        >${props.rangeMax.toString()}</output
      >
      <input
        type="range"
        id="rangeMax"
        name="rangeMax"
        min="0.05"
        max=".5"
        step="0.05"
        onChange=${props.changeSetting}
        value="${props.rangeMax.toString()}"
      />
    </div>
  `;
};
