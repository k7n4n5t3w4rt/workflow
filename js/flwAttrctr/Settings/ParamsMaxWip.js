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
// FUNCTION: ParamsMaxWip
//------------------------------------------------------------------
/*::
type Props = {
	paramsMaxWip: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="paramsMaxWip">Params Max. WIP:</label>
      <output
        id="paramsMaxWipOutput"
        name="paramsMaxWipOutput"
        for="paramsMaxWip"
        >${(props.paramsMaxWip || 0).toString()}</output
      >
      <input
        type="range"
        id="paramsMaxWip"
        name="paramsMaxWip"
        min="1"
        max="200"
        step="1"
        onChange=${props.changeSetting}
        onTouchStart=${setUpdtngCnfg(true)}
        onTouchEnd=${setUpdtngCnfg(false)}
        onMouseDown=${setUpdtngCnfg(true)}
        onMouseUp=${setUpdtngCnfg(false)}
        value="${(props.paramsMaxWip || 0).toString()}"
      />
    </div>
  `;
};
