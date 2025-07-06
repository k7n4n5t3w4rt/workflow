// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../actions/gSttngs.js";
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
  devUnitsTerm: string,
  changeSetting: (e: Event) => void,
};
*/

export const DevUnitsTerm = (props /*: Props */) /*: string */ => {
  const { devUnitsTerm, changeSetting } = props;
  return html`
    <div>
      <p>The term used to describe the development units (e.g., "Devs", "Engineers", "Team"). The default is "Devs".</p>
      <label for="devUnitsTerm">Term for "Dev Units":</label>
      <input
        type="text"
        id="devUnitsTerm"
        name="devUnitsTerm"
        value=${devUnitsTerm}
        onInput=${changeSetting}
        onFocus=${() => setUpdtngCnfg(true)}
        onBlur=${() => setUpdtngCnfg(false)}
      />
    </div>
  `;
};

export default DevUnitsTerm;