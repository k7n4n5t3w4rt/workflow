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
// FUNCTION: RangeMidpoint
//------------------------------------------------------------------
/*::
type Props = {
	rangeMidpoint: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <p>
        The midpoint of the random distribution of work items in a step. The
        default is 0.1.
      </p>
      <label for="rangeMidpoint">Range Midpoint:</label>
      <output
        id="rangeMidpointOutput"
        name="rangeMidpointOutput"
        for="rangeMidpoint"
        >${(props.rangeMidpoint || 0).toString()}</output
      >
      <input
        type="range"
        id="rangeMidpoint"
        name="rangeMidpoint"
        min="0.05"
        max="0.5"
        step="0.05"
        onChange=${props.changeSetting}
        onTouchStart=${setUpdtngCnfg(true)}
        onTouchEnd=${setUpdtngCnfg(false)}
        onMouseDown=${setUpdtngCnfg(true)}
        onMouseUp=${setUpdtngCnfg(false)}
        value="${(props.rangeMidpoint || 0).toString()}"
      />
    </div>
  `;
};
