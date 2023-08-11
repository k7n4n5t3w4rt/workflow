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
	rangeIncreaseRate: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
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
        min="0.25"
        max="2"
        step="0.25"
        onChange=${props.changeSetting}
        value="${(props.rangeIncreaseRate || 0).toString()}"
      />
    </div>
  `;
};
