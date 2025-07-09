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

/*::
type Props = {
	arrivalRate: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <p>
        The Arrival Rate is the number of new work items that arrive in the
        backlog (Step 0) each day. The WIP Limit of the backlog, if set, will
        override the Arrival Rate.
      </p>
      <p>
        You can set the Arrival Rate to 0, in which case no new work will come
        into the backlog and the workflow will effectively stop. You can also
        set the Arrival Rate to a decimal value, which will mean that the number
        of new work items arriving in the backlog will be a fraction of a work
        item per day. For example, an Arrival Rate of 0.25 means that one new
        work item will arrive in the backlog every 4 days.
      </p>
      <label for="arrivalRate">Arrival Rate:</label>
      <output id="arrivalRateOutput" name="arrivalRateOutput" for="arrivalRate"
        >${(props.arrivalRate || 0).toString()}</output
      >
      <input
        type="range"
        id="arrivalRate"
        name="arrivalRate"
        min="0"
        max="100"
        step=".25"
        onChange=${props.changeSetting}
        onTouchStart=${setUpdtngCnfg(true)}
        onTouchEnd=${setUpdtngCnfg(false)}
        onMouseDown=${setUpdtngCnfg(true)}
        onMouseUp=${setUpdtngCnfg(false)}
        value="${(props.arrivalRate || 0).toString()}"
      />
    </div>
  `;
};
