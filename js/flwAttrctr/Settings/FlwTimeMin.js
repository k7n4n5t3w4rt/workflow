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
// FUNCTION: FlwTimeMin
//------------------------------------------------------------------
/*::
type Props = {
	flwTimeMin: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <p>
        The minimum time a work item can take to complete, in days. Because
        there's a 1:1 mapping between how long work items take to get done (Flow
        Time), cube size and the value delivered by each cube getting done, this
        is both a display setting for cube size, a factor in overall flow, and a
        factor in determining the value delivered. The default is 1.
      </p>
      <label for="flwTimeMin">Flow Time Min.:</label>
      <output id="flwTimeMinOutput" name="flwTimeMinOutput" for="flwTimeMin"
        >${(props.flwTimeMin || 0).toString()}</output
      >
      <input
        type="range"
        id="flwTimeMin"
        name="flwTimeMin"
        min="1"
        max="200"
        step="1"
        onChange=${props.changeSetting}
        onTouchStart=${setUpdtngCnfg(true)}
        onTouchEnd=${setUpdtngCnfg(false)}
        onMouseDown=${setUpdtngCnfg(true)}
        onMouseUp=${setUpdtngCnfg(false)}
        value="${(props.flwTimeMin || 0).toString()}"
      />
    </div>
  `;
};
