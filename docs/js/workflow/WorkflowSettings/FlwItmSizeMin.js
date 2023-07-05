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
	flwItmSizeMin: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="flwItmSizeMin">Flow Item Size Min.:</label>
      <output
        id="flwItmSizeMinOutput"
        name="flwItmSizeMinOutput"
        for="flwItmSizeMin"
        >${props.flwItmSizeMin.toString()}</output
      >
      <input
        type="range"
        id="flwItmSizeMin"
        name="flwItmSizeMin"
        min="1"
        max="50"
        step="1"
        onChange=${props.changeSetting}
        value="${props.flwItmSizeMin.toString()}"
      />
    </div>
  `;
};
