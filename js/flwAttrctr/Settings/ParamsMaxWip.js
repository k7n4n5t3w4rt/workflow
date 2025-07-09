// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../actions/gSttngs.js";
import gState from "../actions/gState.js";
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import { useEffect, useState, useReducer } from "preact/hooks";
import { html } from "htm/preact";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import {
  isParsableAsNumber,
  isParsableAsBoolean,
  isParsableAsArray,
} from "../actions/isParsable";
import setUpdtngCnfg from "./setUpdtngCnfg";
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
      <p>
        The maximum value for the WIP limit sliders in the main UI. The default
        is 20.
      </p>
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
