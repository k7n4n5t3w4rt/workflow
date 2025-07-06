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
  useContext,
  useEffect,
  useState,
  useReducer,
} from "../../../web_modules/preact/hooks.js";
import { html } from "../../../web_modules/htm/preact.js";
import { AppContext } from "../../AppContext.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import setUpdtngCnfg from "./setUpdtngCnfg.js";

/*::
type Props = {
  displayName: string,
  changeSetting: (e: Event) => void,
};
*/

export const DisplayNameInput = (props /*: Props */) /*: string */ => {
  const { displayName, changeSetting } = props;
  const [state, dispatch] = useContext(AppContext);
  return html`
    <div>
      <p>The name of this simulation, which will be displayed on the start button. The default is "FlowAttractor_v0.1.0".</p>
      <label for="displayName">Display Name:</label>
      <input
        type="text"
        id="displayName"
        name="displayName"
        value=${displayName}
        onInput=${changeSetting}
        onFocus=${() => setUpdtngCnfg(true)}
        onBlur=${() => setUpdtngCnfg(false)}
      />
    </div>
  `;
};

export default DisplayNameInput;